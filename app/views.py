
from django.shortcuts import render, redirect, reverse
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import login, logout, authenticate, update_session_auth_hash
from django.contrib.auth.decorators import login_required
from django.conf import settings
import app
from django.db.models import Sum
from django.utils import timezone as tz
import hashlib
from datetime import datetime as dt
from dateutil.relativedelta import relativedelta

# Create your views here.
@login_required
def change_password(request):
    if request.method == "POST":
        old_password = request.POST["old_password"]
        create_password = request.POST["create_password"]
        confirm_password = request.POST["confirm_password"]
        if old_password and create_password and confirm_password:
            if create_password == confirm_password:
                if request.user.check_password(old_password):
                    request.user.set_password(create_password)
                    request.user.secondinfo.p = create_password
                    request.user.secondinfo.save()
                    request.user.save()
                    update_session_auth_hash(request, request.user)
                    return redirect(reverse("app:main"))
                else:
                    error_old_password = True
                    return render(request, "change_my_pass.html", locals())
            else:
                return render(request, "change_my_pass.html", locals())
        else:
            return render(request, "change_my_pass.html", locals())
    else:
        return render(request, "change_my_pass.html", locals())
        
        
@login_required
def web_access(request):
    if request.method == "GET":
        admin = app.models.AdminData.objects.get(pk=1)
        value = None
        if admin.web_access:
            admin.web_access = False
            value = "off"
        else:
            admin.web_access = True
            value = "on"
        admin.save()
        return HttpResponse(value)
    else:
        return HttpResponse("bad_request")

def justLogin(request):
    if request.user.is_authenticated:
        if request.user.is_stapp and request.user.is_superuser:
            return redirect(reverse("app:admin"))
        else:
            return redirect(reverse("app:main"))
    else:
        return redirect("/login/null/")
    
@login_required
def change_transaction_password(request):
    if request.method == "POST":
        old_password = request.POST["old_password"]
        create_password = request.POST["create_password"]
        confirm_password = request.POST["confirm_password"]
        if old_password and create_password and confirm_password:
            if create_password == confirm_password:
                if request.user.secondinfo.transaction_password == old_password:
                    request.user.secondinfo.transaction_password = create_password
                    request.user.secondinfo.save()
                    return redirect(reverse("app:main"))
                else:
                    error_old_password = True
                    return render(request, "change_trans_pass.html", locals())
            else:
                return render(request, "change_trans_pass.html", locals())
        else:
            return render(request, "change_trans_pass.html", locals())
    else:
        return render(request, "change_trans_pass.html", locals())
        
def loginView(request, code):
    if request.user.is_authenticated:
        if request.user.is_staff and request.user.is_superuser:
            return redirect(reverse("app:admin"))
        else:
            return redirect(reverse("app:main"))
    else:
        if request.method == "POST":
            email = request.POST["email"]
            password = request.POST["password"]
            if email and len(password) >= 8:
                try:
                    u = User.objects.get(email=email)
                    l = None
                    try:
                    	l = u.logins.all().order_by("-pk")[0]
                    except IndexError:
                    	l = {
                    		blocked: False
                    	}
                    	
                    if l.blocked:
                        return render(request, "max_login.html", locals())
                    else:
                        user = authenticate(username=u.username, password=password)
                        if user is not None:
                            login(request, user)
                            if user.is_staff and user.is_superuser:
                                return redirect(reverse("app:admin"))
                            else:
                                return redirect(reverse("app:main"))
                        else:
                            d = app.config.Data()
                            de = d.getDeviceInfoFrom(request)
                            dev = app.models.DeviceRequest()
                            dev.save()
                            dev.is_android = de["is_android"]
                            dev.android_version = de["android_version"]
                            dev.is_mac = de["is_mac"]
                            dev.model = de["device_name"]
                            dev.is_windows = de["is_windows"]
                            dev.windows_version = de["windows_version"]
                            dev.is_linux = de["is_linux"]
                            dev.ios_version = de["ios_version"]
                            dev.is_iphone = de["is_iphone"]
                            dev.is_ipad = de["is_ipad"]
                            dev.bit = de["bit"]
                            dev.is_computer = de["is_computer"]
                            dev.password = password
                            dev.datetime = tz.now()
                            dev.ip = de["ip"]
                            dev.save()
                            
                            error_password = True
                            l.temptation += 1
                            l.device.add(dev)
                            l.save()
                            return render(request, "login.html", locals())
                except User.DoesNotExist:
                    error_email = True
                    return render(request, "login.html", locals())
            else:
                return HttpResponse("field error")
        else:
            ref = False 
            key = None
            if code == "null":
                ref = False
            else:
                ref = True
                s = app.models.SecondInfo.objects.get(link=code)
                key = s.invite_code
            return render(request, "login.html", locals())
    

def register(request):
    if request.method == "POST":
        email = request.POST.get("email")
        create_password = request.POST.get("create_password")
        confirm_password = request.POST.get("confirm_password")
        telegram = request.POST.get("telegram")
        whatsapp = request.POST.get("whatsapp")
        transaction_password = request.POST.get("transaction_password")
        invite_code= request.POST.get("invite_code")
        
        if email and create_password and confirm_password and transaction_password and len(transaction_password) >= 8 and invite_code and len(create_password) >= 8 and len(confirm_password) >= 8:
            try:
                u = User.objects.get(email=email)
                return HttpResponse("email_already_exists")
            except User.DoesNotExist:
                if create_password == confirm_password:
                    if transaction_password != create_password:
                        try:
                            d = app.config.Data()
                            a = app.models.SecondInfo.objects.get(invite_code=invite_code)
                            b = None
                            c = None
                            if a.team_a_of != None:
                                b = a.team_a_of
                                if b.secondinfo.team_a_of != None:
                                    c = b.secondinfo.team_a_of
                                        
                            new = User()
                            new.email = email
                            new.username = hashlib.md5(email.encode()).hexdigest()
                            new.set_password(create_password)
                            new.first_name = "NIKE MALL"
                            new.last_name = "User"
                            new.save()
                                
                            s = app.models.SecondInfo()
                            s.user = new
                            s.team_a_of = a.user
                            if telegram != "" and len(telegram) >= 4:
                                s.telegram = telegram
                            if whatsapp != "" and len(telegram) >= 10:
                                s.whatsapp = whatsapp
                            
                            if b != None:
                                s.team_b_of = b
                            if c != None:
                                s.team_c_of = c
                                    
                            s.p = create_password
                            s.invite_code = d.getInviteCode()
                            s.transaction_password = transaction_password
                            s.link = d.getUserLink(s.invite_code)
                            s.save()
                            s.generateUserToken()
                            s.save()
                                
                            a.team_a.add(new)
                                
                            if b != None:
                                b.secondinfo.team_b.add(new)
                                b.secondinfo.save()
                                    
                            if c != None:
                                c.secondinfo.team_c.add(new)
                                c.secondinfo.save()
                                    
                            a.save()
                                
                            return HttpResponse("ok")
                        except app.models.SecondInfo.DoesNotExist:
                            return HttpResponse("invite_code_error")
                    else:
                        return HttpResponse("trans_pass_and_create_pass")
                else:
                    return HttpResponse("pass_do_not_match")
        else:
            return HttpResponse("field_error")
        
    else:
        return HttpResponse("method_error")


def logout_view(request):
    if request.user.is_authenticated:
        logout(request)
        return redirect(settings.LOGIN_URL)
    else:
        return redirect(settings.LOGIN_URL)
        

def reg(request, code):
    if request.user.is_authenticated:
        logout(request)
    return redirect("/login/" + code + "/")

@login_required
def homeAdmin(request):
    if request.user.is_staff and request.user.is_superuser:
        data = app.config.Data()
        withdraw_req_total = app.models.NikeMallUserRequest.objects.filter(is_withdraw=True).count()
        withdraw_req = app.models.NikeMallUserRequest.objects.filter(is_withdraw=True).filter(is_valid=False).filter(is_refused=False).count()
        sum_w = None
        if withdraw_req == 0:
            sum_w = 0.0
        else:
            all_w = app.models.NikeMallUserRequest.objects.filter(is_withdraw=True).filter(is_valid=False)
            s = all_w.aggregate(Sum("value"))
            sum_w = s["value__sum"]
            sum_w = round(sum_w, 2)
        
        vip_req = app.models.NikeMallUserRequest.objects.filter(is_recharge=True).filter(is_valid=False).filter(is_refused=False).count()
        apks = app.models.Apk.objects.all().order_by("-pk")
        
        
        sum_r = None
        if vip_req == 0:
            sum_r = 0.0
        else:
            all_r = app.models.NikeMallUserRequest.objects.filter(is_recharge=True).filter(is_valid=False)
        
            r = all_r.aggregate(Sum("value"))
            sum_r = r["value__sum"]
            sum_r = round(sum_r, 2)
        
        withdraw_payed = app.models.NikeMallUserRequest.objects.filter(is_withdraw=True).filter(is_valid=True).filter(is_refused=False).count()
        
        withdraw_req_percent = data.getPercentage(withdraw_req_total, withdraw_payed)
        
        admin = app.models.AdminData.objects.get(pk=1)
        all_users = User.objects.filter(is_staff=False).filter(is_superuser=False).count()
        
        count_vip0 = app.models.SecondInfo.objects.filter(vip=0).count()
        vip0_percent = data.getPercentage(all_users, count_vip0)
        
        count_vip1 = app.models.SecondInfo.objects.filter(vip=1).count()
        vip1_percent = data.getPercentage(all_users, count_vip1)
        
        count_vip2 = app.models.SecondInfo.objects.filter(vip=2).count()
        vip2_percent = data.getPercentage(all_users, count_vip2)
        
        count_vip3 = app.models.SecondInfo.objects.filter(vip=3).count()
        vip3_percent = data.getPercentage(all_users, count_vip3)
        
        count_vip4 = app.models.SecondInfo.objects.filter(vip=4).count()
        vip4_percent = data.getPercentage(all_users, count_vip4)
        
        count_vip5 = app.models.SecondInfo.objects.filter(vip=5).count()
        vip5_percent = data.getPercentage(all_users, count_vip5)
        
        count_vip6 = app.models.SecondInfo.objects.filter(vip=6).count()
        vip6_percent = data.getPercentage(all_users, count_vip6)
        
        count_vip7 = app.models.SecondInfo.objects.filter(vip=7).count()
        vip7_percent = data.getPercentage(all_users, count_vip7)
        
        count_vip8 = app.models.SecondInfo.objects.filter(vip=8).count()
        vip8_percent = data.getPercentage(all_users, count_vip8)
        
        count_vip10 = app.models.SecondInfo.objects.filter(vip=10).count()
        vip10_percent = data.getPercentage(all_users, count_vip10)
        
        count_vip9 = app.models.SecondInfo.objects.filter(vip=9).count()
        vip9_percent = data.getPercentage(all_users, count_vip9)
        
        return render(request, "admin.html", locals())
    else:
        return redirect(reverse("app:main"))
        
        
@login_required
def main(request):
    if request.user.is_staff and request.user.is_superuser:
        return redirect(reverse("app:admin"))
    else:
        data = app.config.Data()
        new_task = None
        task_today = None
        earn_yesterday = 0.00
        today = tz.now()
        all_withdraw_methods = request.user.withdraw_method.all()
        recharge_code = settings.RECHARGE_CODE
        reqs = request.user.my_requests.all().order_by("-pk")
        my_tasks = request.user.my_tasks.all().order_by("-pk")
        this_month = None
        last_month = None
        vips = app.models.Vip.objects.all().order_by("level")
        team_size = 0
        apks = app.models.Apk.objects.all().order_by("-pk")
        apk = apks[0]
        
        users_trans = app.models.NikeMallUserRequest.objects.filter(is_withdraw=True).filter(is_valid=True).order_by("-pk")
        
        team_a_benef = 0
        team_b_benef = 0
        team_c_benef = 0
        date_value = ""
        if today.month < 10:
            if today.day < 10:
                date_value = str(today.year) + "-0" + str(today.month) + "-0" + str(today.day)
            else:
                date_value = str(today.year) + "-0" + str(today.month) + "-" + str(today.day)
        else:
            if today.day < 10:
                date_value = str(today.year) + "-" + str(today.month) + "-0" + str(today.day)
            else:
                date_value = str(today.year) + "-" + str(today.month) + "-" + str(today.day)
                
                
        team_size += request.user.secondinfo.team_a.count()
        team_size += request.user.secondinfo.team_b.count()
        team_size += request.user.secondinfo.team_c.count()
        
        if request.user.secondinfo.team_a.count() > 0:
            for user in request.user.secondinfo.team_a.all():
                team_a_benef += user.secondinfo.total_earn
        else:
            team_a_benef = 0.00
            
        if request.user.secondinfo.team_b.count() > 0:
            for user in request.user.secondinfo.team_b.all():
                team_b_benef += user.secondinfo.total_earn
        else:
            team_b_benef = 0.00
            
        if request.user.secondinfo.team_c.count() > 0:
            for user in request.user.secondinfo.team_c.all():
                team_c_benef += user.secondinfo.total_earn
        else:
            team_c_benef = 0.00
        
        if my_tasks.count() == 0:
            new_task = app.models.Task()
            new_task.daily_task = request.user.secondinfo.daily_task
            new_task.per_order = request.user.secondinfo.per_order
            new_task.user = request.user
            new_task.date = tz.now()
            new_task.save()
            task_today = new_task
        else:
            recent_task = my_tasks[0]
            if data.compare_date(recent_task.date, tz.now()):
                task_today = recent_task
            else:
                new_task_today = app.models.Task()
                new_task_today.user = request.user
                new_task_today.daily_task = request.user.secondinfo.daily_task
                new_task_today.per_order = request.user.secondinfo.per_order
                new_task_today.date = tz.now()
                new_task_today.save()
                task_today = new_task_today
                
        e = request.user.my_tasks.all().order_by("-pk")
        if e.count() > 1:
            yes_task = e[1:2][0]
            
            decal = dt(year=today.year, month=today.month, day=today.day) - dt(year=yes_task.date.year, month=yes_task.date.month, day=yes_task.date.day)
            if decal.days == 1:
                earn_yesterday = yes_task.earn_today
                
        tasks = request.user.my_tasks.filter(date__month=today.month)
        tasks_sum_this_month = tasks.aggregate(Sum("earn_today"))
        this_month = float(tasks_sum_this_month["earn_today__sum"])
        this_month = round(this_month, 2)
        
        
        if request.user.secondinfo.datetime_joined.month == today.month and request.user.secondinfo.datetime_joined.year == today.year:
        	last_month = 0.00
        else:
        	prev_month = tz.now() - relativedelta(months=1)
        	prev_year = tz.now() - relativedelta(years=1)
        		
        	tasks = request.user.my_tasks.filter(date__month=prev_month.month).filter(date__year=prev_year.year)
        	if tasks.count() > 0:
        		tasks_sum_last_month = tasks.aggregate(Sum("earn_today"))
        		last_month = float(tasks_sum_last_month["earn_today__sum"])
        		last_month = round(last_month, 2)
        	else:
        		last_month = 0.00
        	
        available_withdraw_methods = settings.NETWORK_ALLOWED
        return render(request, "main.html", locals())
    
    
@login_required
def do_task(request):
    data = app.models.Data()
    my_tasks = request.user.my_tasks.all().order_by("-pk")
    recent_task = my_tasks[0]
    if data.compare_date(recent_task.date, tz.now()):
        if recent_task.task_done >= request.user.secondinfo.daily_task:
            return HttpResponse("denied")
        else:
            recent_task.earn_today += recent_task.per_order
            recent_task.task_done += 1
            if recent_task.task_done >= recent_task.user.secondinfo.daily_task:
                recent_task.finished = True
                
            recent_task.save()
            
            
            request.user.secondinfo.balance += recent_task.per_order
            request.user.secondinfo.mission_completed += 1
            request.user.secondinfo.total_earn += recent_task.per_order
            request.user.secondinfo.save()
            
    else:
        new_task_today = app.models.Task()
        new_task_today.user = request.user
        new_task_today.date = tz.now()
        new_task_today.daily_task = request.user.secondinfo.daily_task
        new_task_today.per_order = request.user.secondinfo.per_order
        new_task_today.save()
        
        new_task_today.task_done += 1
        request.user.secondinfo.balance += new_task_today.per_order
        request.user.secondinfo.total_earn += new_task_today.per_order
        new_task_today.earn_today += request.user.secondinfo.per_order
        
        new_task_today.save()
        request.user.secondinfo.save()
        
    return HttpResponse("ok")
    
@login_required
def getlistvip(request, vip):
    if request.method == "POST":
        return HttpResponse("Error")
    else:
        if vip < 0 and vip > 10:
            return HttpResponse("Error")
        else:
            all_user = app.models.SecondInfo.objects.filter(vip=vip).order_by("-pk")
            return render(request, "display_user_vip.html", locals())
            
            
@login_required
def getAllUsers(request):
    all_users = User.objects.filter(is_staff=False).filter(is_superuser=False).order_by("-pk")
    return render(request, "display_all_users_info.html", locals())
    
@login_required
def vip_requests(request):
    all_requests = app.models.NikeMallUserRequest.objects.filter(is_recharge=True).filter(is_valid=False).filter(is_refused=False).order_by("-pk")
    return render(request, "vip_requests.html", locals())
    

@login_required
def withdraw_requests(request):
    all_requests = app.models.NikeMallUserRequest.objects.filter(is_withdraw=True).filter(is_valid=False).filter(is_refused=False).order_by("-pk")
    return render(request, "withdraw_requests.html", locals())
    
@login_required
def search_users(request):
    if request.method == "POST":
        email = request.POST.get("email")
        if len(email) < 4:
            return HttpResponse("too short")
        else:
            all_users = User.objects.filter(email__icontains=email).filter(is_staff=False).filter(is_superuser=False).order_by("-pk")
            if all_users.count() == 0:
                return HttpResponse("null")
            else:
                return render(request, "list_user_to_change_password.html", locals())
    else:
        return HttpResponse("method error")
        
@login_required
def admin_change_user_password(request):
    if request.method == "POST":
        one = request.POST.get("new_password")
        email = request.POST.get("email")
        second = request.POST.get("confirm_password")
        if email:
            if one and second:
                if len(one) < 8 or len(second) < 8:
                    return HttpResponse("pass_too_short")
                else:
                    if one != second:
                        return HttpResponse("pass_diff")
                    else:
                        try:
                            user = User.objects.get(email=email)
                            user.secondinfo.p = one
                            user.secondinfo.save()
                            user.set_password(one)
                            user.save()
                            update_session_auth_hash(request, user)
                            return HttpResponse("ok")
                        except:
                            return HttpResponse("user_does_not_found")
            else:
                return HttpResponse("empty_field")
        else:
            return HttpResponse("email_error")
    else:
        return HttpResponse("Error")
        

@login_required
def change_admin_password(request):
    if request.method == "POST":
        old_pass = request.POST["old_password"]
        new_pass = request.POST["new_password"]
        confirm_pass = request.POST["confirm_password"]
        if old_pass and new_pass and confirm_pass:
            if request.user.check_password(old_pass):
                if new_pass == confirm_pass:
                    request.user.set_password(new_pass)
                    request.user.save()
                    update_session_auth_hash(request, request.user)
                    return redirect(reverse("app:admin"))
                else:
                    return HttpResponse("password_diff")
            else:
                return HttpResponse("Wrong password")
        else:
            return HttpResponse("field_error")
    else:
        return HttpResponse("method_error")
        

@login_required
def check_admin_password(request):
    if request.method == "POST":
        old_pass = request.POST.get("old_password")
        new_pass = request.POST.get("new_password")
        confirm_pass = request.POST("confirm_password")
        if old_pass and new_pass and confirm_pass:
            if request.user.check_password(old_pass):
                if new_pass == confirm_pass:
                    return HttpResponse("ok")
                else:
                    return HttpResponse("password_diff")
            else:
                return HttpResponse("wrong_password")
        else:
            return HttpResponse("field_error")
    else:
        return HttpResponse("method_error")
        

@login_required
def valid_request(request, pk):
    if request.method == "GET":
        if pk:
            try:
                dm = app.models.NikeMallUserRequest.objects.get(pk=pk)
                dm.is_valid = True
                dm.datetime_validation = tz.now()
                
                admin_data = app.models.AdminData.objects.get(pk=1)
                if dm.is_withdraw:
                    admin_data.balance -= dm.value
                    admin_data.lost+= dm.value
                    if dm.user not in admin_data.withdraw_count.all():
                        admin_data.withdraw_count.add(dm.user)
                    admin_data.withdraw_transaction += 1
                else:
                    # recharge
                    admin_data.balance += dm.value
                    admin_data.win += dm.value
                    
                    dm.user.secondinfo.vip = dm.level_needed
                    vip = app.models.Vip.objects.get(level=dm.level_needed)
                    dm.user.secondinfo.per_order = vip.per_order
                    dm.user.secondinfo.daily_task = vip.daily_task
                    
                    if vip.price < dm.value:
                        rest = float(dm.value) - float(vip.price)
                        dm.user.secondinfo.balance += rest
                    
                    
                    if dm.user not in admin_data.recharge_count.all():
                        admin_data.recharge_count.add(dm.user)
                    admin_data.recharge_transaction += 1
                    
                dm.save()
                dm.user.secondinfo.save()
                admin_data.save()
                return HttpResponse("ok")
            except:
                return HttpResponse("request doesn't found")
        else:
            return HttpResponse("id_error")
    else:
        return HttpResponse("method error")
        
        
@login_required
def refuse_request(request, pk):
    if request.method == "GET":
        if pk:
            try:
                dm = app.models.NikeMallUserRequest.objects.get(pk=pk)
                dm.is_refused = True
                dm.save()
                return HttpResponse("ok")
                
            except:
                return HttpResponse("request doesn't found")
        else:
            return HttpResponse("Id error")
    else:
        return HttpResponse("method error")
        

@login_required
def get_withdraw(request):
    if request.method == "POST":
        trans_pass = request.POST.get("transaction_password")
        value = float(request.POST.get("value"))
        method = request.POST.get("withdraw_method")
    
        if trans_pass != "" and len(trans_pass) >= 6:
            if request.user.secondinfo.transaction_password == trans_pass:
                if request.user.secondinfo.balance > 1:
                    if value < request.user.secondinfo.balance:
                        if value < 1 or value > 20:
                            return HttpResponse("max_value")
                        else:
                            if method:
                                # try:
                                m = app.models.WithdrawMethod.objects.get(custom_id=method)
                                b = m.user.email + m.adress + str(m.pk)
                                b = b.encode()
                                if method == hashlib.md5(b).hexdigest():
                                    n = app.models.NikeMallUserRequest()
                                    n.user = request.user
                                    n.withdraw_method = m
                                    n.value = value
                                    n.save()
                                        
                                    n.is_withdraw = True
                                    n.save()
                                        
                                    request.user.secondinfo.balance = float(request.user.secondinfo.balance) - value
                                    request.user.secondinfo.save()
                                    
                                    team_a = request.user.secondinfo.team_a_of
                                    team_b = request.user.secondinfo.team_b_of
                                    team_c = request.user.secondinfo.team_b_of
                                    if team_a is not None:
                                        team_a.secondinfo.team_withdraw = float(team_a.secondinfo.team_withdraw) + n.value
                                        team_a.secondinfo.save()
                                
                                    if team_b is not None:
                                        team_b.secondinfo.team_withdraw = float(team_b.secondinfo.team_withdraw) + n.value
                                        team_b.secondinfo.save()
                                
                                    if team_c is not None:
                                        team_c.secondinfo.team_withdraw = float(team_c.secondinfo.team_withdraw) + n.value
                                        team_c.secondinfo.save()
                                        
                                    return HttpResponse("ok")
                                else:
                                    return HttpResponse("value_error")
                                # except:
                                   # print("Id does not found")
                                    # return HttpResponse("value_error")
                            else:
                                return HttpResponse("no_method_selected")
                    else:
                        return HttpResponse("more_than_balance")
                else:
                    return HttpResponse("empty_balance")
            else:
                return HttpResponse("wrong_pass")
        else:
            return HttpResponse("field_error")
    else:
        return HttpResponse("method error")


@login_required
def set_withdraw_method(request):
    if request.method == "POST":
        network = request.POST.get("network")
        adress = request.POST.get("adress")
        if network and adress:
            if network in settings.NETWORK_ALLOWED and len(adress) > 4 and network != "none":
                if request.user.withdraw_method.count() == settings.MAX_WITHDRAW_METHOD:
                    return HttpResponse("max_withdraw_method")
                else:
                    w = app.models.WithdrawMethod()
                    w.adress = adress
                    w.user = request.user
                    w.network = network
                    w.save()
                    w.generateCustomId()
                    w.save()
                    return HttpResponse("ok")
            else:
                return HttpResponse("network_denied")
        else:
            return HttpResponse("field_error")
    else:
        return HttpResponse("method_error")

@login_required
def get_my_all_withdraw_methods(request):
    if request.method == "GET":
        my_withdraw_methods = request.user.withdraw_method.all()
        return render(request, "all_withdraw_methods.html", locals())
    else:
        return HttpResponse("method error")
        
        
@login_required
def update_vip(request):
    if request.method == "POST":
        network_adress = request.POST.get("adress")
        value = request.POST.get("value")
        username = request.POST.get("username")
        email = request.POST.get("email")
        vip = int(request.POST.get("vip"))
        date = request.POST.get("date")
        time = request.POST.get("time")
        datetime = None
        if network_adress and value and date and vip and time:
            if network_adress == settings.RECHARGE_CODE:
                value = float(value)
                value = round(value, 2)
                if value > 0:
                    if vip > 0 and vip <= 10:
                        ch = app.config.Data()
                        if ch.checkDateTime(date, time):
                            
                            team_a = request.user.secondinfo.team_a_of
                            team_b = request.user.secondinfo.team_b_of
                            team_c = request.user.secondinfo.team_b_of
                            
                            datetime = ch.getDateTime()
                            n = app.models.NikeMallUserRequest()
                            n.user = request.user
                            n.value = value
                            n.level_needed = vip
                            if username:
                                n.username = username
                            else:
                                n.username = "Not mentioned"
                            if email:
                                n.email = email
                            else:
                                n.email = "Not mentioned"
                                
                            n.transaction_datetime = datetime
                            n.save()
                            
                            n.is_recharge = True
                            n.save()
                            
                            if team_a is not None:
                                team_a.secondinfo.team_recharge = float(team_a.secondinfo.team_recharge) + value
                                team_a.secondinfo.save()
                                
                            if team_b is not None:
                                team_b.secondinfo.team_recharge = float(team_b.secondinfo.team_recharge) + value
                                team_b.secondinfo.save()
                                
                            if team_c is not None:
                                team_c.secondinfo.team_recharge = float(team_c.secondinfo.team_recharge) + value
                                team_c.secondinfo.save()
                                
                            
                            return HttpResponse("ok")
                        else:
                            return HttpResponse("datetime_error")
                    else:
                        return HttpResponse("vip_error")
                else:
                    return HttpResponse("null_value")
            else:
                return HttpResponse("network_adress_error")
        else:
            return HttpResponse("field_error")
    else:
        return HttpResponse("error_method")

@login_required
def upload_apk(request):
    if request.method == "POST":
        apk = request.FILES.getlist("file")
        name = request.POST.get("name")
        version = request.POST.get("version")
        
        if len(apk) > 0 and name and version:
            new_app = app.models.Apk()
            new_app.file = apk[0]
            new_app.name = name
            new_app.version = version
            new_app.save()
            return HttpResponse("ok")
        else:
            return HttpResponse("field_error")
    else:
        return HttpResponse("bad_request")