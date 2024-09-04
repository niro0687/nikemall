
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.contrib.auth import logout, login, authenticate
from django.shortcuts import render, reverse, redirect
import hashlib
from django.utils import timezone as tz
from django.conf import settings
import app

class PostDataMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
    
    def __call__(self, request):
        response = self.get_response(request)
        return response
        
    def process_view(self, request, view_func, view_args, view_kwargs):
        if request.method == "POST":
            if request.user.is_authenticated and request.user.is_staff == False:
                code = request.user.email + "@nikemall" + str(request.user.pk) + ".id"
                code = code.encode()
                user_token = request.POST["user_token"]
                if user_token:
                    if hashlib.md5(code).hexdigest() == user_token:
                        pass
                    else:
                        return HttpResponse("error_user_token")
                else:
                    return HttpResponse("missing_user_token")
                    
                    
class NikeMallUserGetMiddleware:
    def __init__(self, get_response):
        self.view_name_allowed = ["main", "do_task", "update_vip", "get_my_all_withdraw_methods", "set_withdraw_method", "get_withdraw", "register", "change_password", "change_transaction_password", "loginView", "logout_view", "reg", "serve", "justLogin"]
        self.get_response = get_response
        
    def __call__(self, request):
        response = self.get_response(request)
        return response
        
    def process_view(self, request, view_func, view_args, view_kwargs):
        if request.method == "GET":
            if request.user.is_authenticated and request.user.is_staff == False and request.user.email != settings.SPECIAL_USER_EMAIL:
                data = str(view_func).split(" ")
                view_name = data[1]
                if view_name in self.view_name_allowed:
                    if view_name == "register":
                        logout(request)
                    if view_name == "serve":
                        apk = app.models.Apk.objects.all().order_by("-pk")[0]
                        if apk.file.name == view_kwargs["path"] and view_kwargs["document_root"] == "media":
                            pass
                        else:
                            return HttpResponse("request_forbidden")
                else:
                    return HttpResponse("request_forbidden")
                    
                    
class UserLoginMiddleware:
    def __init__(self, get_response):
        self.logins = None
        self.u = None
        self.get_response = get_response
        self.new_login = None
        self.login = None
        
    def __call__(self, request):
        response = self.get_response(request)
        return response
        
    def process_view(self, request, view_func, view_args, view_kwargs):
        if not request.user.is_authenticated and request.method == "POST":
            data = str(view_func).split(" ")
            view_func_name = data[1]
            if view_func_name == "loginView":
                email = request.POST["email"]
                try:
                    self.u = User.objects.get(email=email)
                    if self.u.logins.count() > 0:
                        if self.u.logins.count() == 1:
                            self.login = self.u.logins.all()[0]
                            if self._date_is_same(self.login.date, tz.now()):
                                if self.login.temptation >= settings.MAX_LOGIN_LIMIT:
                                    self.login.blocked = True
                            else:
                                self._create_new_user_login()
                        else:
                            self.login = self.u.logins.all().order_by("-pk")[0]
                            if self._date_is_same(self.login.date, tz.now()):
                                if self.login.temptation >= settings.MAX_LOGIN_LIMIT:
                                    self.login.blocked = True
                            else:
                                self._create_new_user_login()
                                
                        if self.login != None:
                            self.login.save()
                    else:
                        self._create_new_user_login()
                except:
                    pass
                
    def _create_new_user_login(self):
        self.new_login = app.models.UserLoginTemptation()
        self.new_login.date = tz.now()
        self.new_login.user = self.u
        self.new_login.save()
        
    def _date_is_same(self, date1, date2):
        if date1.year == date2.year:
            if date1.month == date2.month:
                if date1.day == date2.day:
                    return True
                else:
                    return False
            else:
                return False
        else:
            return False
            

class WebAccessMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
    
    def __call__(self, request):
        response = self.get_response(request)
        return response
    
    def process_view(self, request, view_func, view_args, view_kwargs):
        if request.user.is_authenticated and request.user.is_staff == False and request.user.is_superuser == False:
            admin = app.models.AdminData.objects.get(pk=1)
            if not admin.web_access and "logout_view" not in str(view_func):
                return render(request, "server_error.html", locals())