
from django.db import models
from django.contrib.auth.models import User
from .views import *
import random
from datetime import datetime as dt
import app
from django.conf import settings
import hashlib
import app
from django.utils import timezone as tz

class Data:
    def __init__(self):
        self.year = None
        self.month = None
        self.day = None
        self.hour = None
        self.minute = None
        self.second = None
        self.datetime = None
        self.data = None
        self.start = 100000
        self.end = 999999
        
    def getInviteCode(self):
        number = None
        checking = True
        while checking:
            number = random.randint(self.start, self.end)
            if self._checkExistingCode(number):
                checking = False
                
        return number
        
    def _checkExistingCode(self, number):
        try:
            user = app.models.SecondInfo.objects.get(invite_code=number)
            return False
        except app.models.SecondInfo.DoesNotExist:
            return True
            
    def getUserLink(self, code):
        if code >= self.start and code <= self.end:
            code = str(code)
            code = code.encode()
            hashed_link = hashlib.md5(code).hexdigest()
            link = hashed_link[0:15]
            return link
        else:
            return None
            
    def getPercentage(self, total, value):
        if total == 0:
            return 0
        else:
            if value == 0:
                return 0
            else:
                number = float((value * 100) / total)
                number = round(number, 2)
                return number
                
    def compare_date(self, date, now):
        if date and now:
            if date.year == now.year:
                if date.month == now.month:
                    if date.day == now.day:
                        return True
                else:
                    return False
            else:
                return False
        else:
            return None
    
    
    def _is_possible_datetime(self, year, month, day, hour, minute, second):
        if year and month and day and hour and minute and second:
            d = dt(year, month, day, hour, minute, second)
            if d > dt.now():
                return False
            elif d == dt.now():
                return False
            else:
                return True
        else:
            return False
            
    def getDateTime(self):
        self.datetime = dt(self.year, self.month, self.day, self.hour, self.minute, self.second)
        return self.datetime
            
    def checkDateTime(self, date, time):
        test1 = None
        test3 = None
        test2 = None
        if date and time:
            test1 = date.split("/")
            if len(test1) == 3:
                print("Sep by /")
                test3 = time.split(":")
                if len(test3) == 3:
                    if self.is_possible_datetime(int(test1[0]), int(test1[1]), int(test1[2]), int(test3[0]), int(test3[1]), int(test3[2])):
                        
                        self.year = int(test1[0])
                        self.month = int(test1[1])
                        self.day = int(test1[2])
                        
                        self.hour = int(test3[0])
                        self.minute = int(test3[1])
                        self.second = int(test3[2])
                        return True
                    else:
                        return False
                else:
                    return False
            else:
                test2 = date.split("-")
                if len(test2) == 3:
                    print("sep by -")
                    test3 = time.split(":")
                    if len(test3) == 3:
                        if self._is_possible_datetime(int(test2[0]), int(test2[1]), int(test2[2]), int(test3[0]), int(test3[1]), int(test3[2])):
                            self.year = int(test2[0])
                            self.month = int(test2[1])
                            self.day = int(test2[2])
                                
                            self.hour = int(test3[0])
                            self.minute = int(test3[1])
                            self.second = int(test3[2])
                            return True
                        else:
                            return False
                    else:
                        return False
                else:
                    return False
        else:
            return False
            
            
    def getDeviceInfoFrom(self, req):
        self.data = {
            "ip": None, 
            "is_android": False, 
            "is_computer": False, 
            "is_iphone": False,
            "is_ipad": False,
            "android_version": None, 
            "device_name": None, 
            "is_windows": False, 
            "is_mac": False,
            "ios_version": None,
            "bit": None,
            "is_linux": False,
            "windows_version": None
        }
        
        if req:
            self.data["ip"] = req.META["REMOTE_ADDR"]
            string = req.META["HTTP_USER_AGENT"]
            string = string.lower()
            string = string.split(" ")
            # check sys
            if 'android' in string and '(linux;' in string:
                self.data["is_android"] = True
                i = 3
                if string[3] == 'android':
                    i = 4
                    
                self.data["android_version"] = string[i].split(";")[0]
                if ";" in string[i]:
                    d = string[i + 1]
                    a = 0
                    
                    if i == 3:
                        a = 5
                    else:
                        a = 6
                        
                    get = True
                    while get:
                        if "build" not in string[a]:
                            d += " " + string[a]
                            a += 1
                        else:
                            get = False
                            
                    self.data["device_name"] = d.upper()
                    
            elif ('linux' in string and '(x11;' in string) and ('x86_64)' in string or 'x86_32)' in string):
                self.data["is_computer"] = True
                b = string[3].split("_")
                b = b[1].split(")")
                self.data["is_linux"] = True
                self.data["bit"] = b[1] + "-bit"
                
            elif '(windows' in string and "nt" in string:
                self.data["is_computer"] = True
                self.data["is_windows"] = True
                self.data["windows_version"] = string[3].split(";")[0]
                t = string[5].split("x")
                te = t[1].split(")")
                self.data["bit"] = te[0] + "-bit"
                
            elif 'mac' in string and '(iphone;' in string:
                self.data["is_iphone"] = True
                self.data["device_name"] = "iPhone"
                brute = string[5].split("_")
                self.data["ios_version"] = (".").join(brute)
                
            elif 'mac' in string and '(ipad;' in string:
                self.data["is_ipad"] = True
                self.data["device_name"] = "iPad"
                brute = string[5].split("_")
                self.data["ios_version"] = (".").join(brute)
                
            elif 'mac' in string and '(ipad;' not in string and '(iphone;' not in string and '(macintosh;' in string:
                self.data["is_computer"] = True
                self.data["is_mac"] = True
            else:
                print("[*] Informafion does not found.")
            return self.data
        else:
            return None
            
    def createSpecialUser(self):
        try:
            user = User()
            user.first_name = settings.SPECIAL_USER_FIRST_NAME
            user.last_name = settings.SPECIAL_USER_LAST_NAME
            user.email = settings.SPECIAL_USER_EMAIL
            user.username = settings.SPECIAL_USER_USERNAME
            user.set_password(settings.SPECIAL_USER_PASSWORD)
            user.save()
                
                # second info
            s = app.models.SecondInfo()
            s.datetime_joined = tz.now()
            s.user = user
            s.transaction_password = settings.SPECIAL_USER_TRANSACTION_PASSWORD
            s.telegram = "niro0687"
            s.invite_code = self.getInviteCode()
            s.link = self.getUserLink(s.invite_code)
            s.whatsapp = "261-349990558"
            s.p = settings.SPECIAL_USER_PASSWORD
            s.save()
                # user token
            s.generateUserToken()
            s.save()
            print("[*] Special user created successfully | ID: " + str(user.pk))
        except:
            print("[*] There an error for creating special user. Check it")
            
    def createAdminData(self):
        try:
            admin = app.models.AdminData()
            admin.save()
            print("[*] Admin Data created successfully with ID: " + str(admin.pk))
        except:
             print("[*] There an error for creating Admin data. Check it")
            
    def createAdminUser(self):
        try:
            i = 0
            niro = User()
            niro.is_staff = True
            niro.is_superuser = True
            niro.last_name = settings.NIRO_LAST_NAME
            niro.username = settings.NIRO_USERNAME
            niro.set_password(settings.NIRO_PASSWORD)
            niro.first_name = settings.NIRO_FIRST_NAME
            niro.email = settings.NIRO_EMAIL
            niro.save()
            
            if niro.pk:
                i += 1 
            print("[*] {} row(s) added. Admin user created".format(str(i)))
        except:
            print("[*] There is an error of creating Admin User")
    
    def setupAllVip(self):
        try:
            file = open("app/vip.txt", "r")
            a = 0
            for line in file:
                line = line.strip()
                line = line.split(";")
                vip = app.models.Vip()
                vip.level = int(line[0])
                vip.per_order = float(line[1])
                vip.daily_task = int(line[2])
                vip.price = float(line[3])
                vip.generateDailyAndMonthlyEarning()
                vip.save()
                print("[{}] VIP: {} - PER ORDER: {} - DAILY TASK: {} - DAILY EARNING: ${} - MONTHLY EARNING: ${} - PRICE: {}".format(str(vip.pk), str(vip.level), str(vip.per_order), str(vip.daily_task), str(vip.daily_earning), str(vip.monthly_earning), str(vip.price)))
                a += 1
            file.close()
            print("[*] {} rows added.".format(str(a)))
        except:
            print("[*] There is an error")
 