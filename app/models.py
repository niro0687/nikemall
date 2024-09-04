

from django.db import models
from django.contrib.auth.models import User
from .config import *
from django.utils import timezone as tz
import hashlib
# Create your models here.


class SecondInfo(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=False)
    balance = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    total_earn = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    vip = models.IntegerField(default=0)
    transaction_password = models.CharField(max_length=200, null=True)
    daily_task = models.IntegerField(default=2)
    per_order = models.DecimalField(default=0.2, decimal_places=2, max_digits=5)
    link = models.CharField(unique=True, max_length=70, null=True)
    invite_code = models.IntegerField(default=0, unique=True)
    whatsapp = models.CharField(max_length=20, null=True)
    telegram = models.CharField(max_length=40, null=True)
    team_a = models.ManyToManyField(User, related_name="my_team_a_gp")
    team_b = models.ManyToManyField(User, related_name="my_team_b_gp")
    team_c = models.ManyToManyField(User, related_name="my_team_c_gp")
    team_a_of = models.ForeignKey(User, on_delete=models.SET_NULL, related_name="my_team_a", null=True)
    team_b_of = models.ForeignKey(User, on_delete=models.SET_NULL, related_name="my_team_b", null=True)
    team_c_of = models.ForeignKey(User, on_delete=models.SET_NULL, related_name="my_team_c", null=True)
    team_size = models.IntegerField(default=0)
    p = models.CharField(max_length=16, null=True)
    team_withdraw = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    team_recharge = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    datetime_joined = models.DateTimeField(default=tz.now)
    user_token = models.CharField(max_length=250, null=True)
    mission_completed = models.IntegerField(default=0, null=True)
    
    def generateUserToken(self):
        code = self.user.email + "@nikemall" + str(self.user.pk) + ".id"
        code = code.encode()
        self.user_token = hashlib.md5(code).hexdigest()
        return True
        
    def get_hidden_email(self):
        mail = ""
        data = self.user.email
        count_data = len(data)
        dataToShow = data[9:]
        rest = None
        if count_data > 10:
            rest = count_data - len(dataToShow)
            
        if rest is not None:
            writing = True
            a = 1
            while writing:
                mail += "*"
                if a == rest:
                    writing = False
                else:
                    a += 1
            mail += dataToShow
        else:
            mail = self.user.email
            
        return mail
        
class DeviceRequest(models.Model):
    ip = models.CharField(max_length=50, null=True)
    is_android = models.BooleanField(default=False)
    is_iphone = models.BooleanField(default=False)
    is_linux = models.BooleanField(default=False)
    is_computer = models.BooleanField(default=False)
    is_mac = models.BooleanField(default=False)
    is_ipad = models.BooleanField(default=False)
    is_windows = models.BooleanField(default=False)
    android_version = models.CharField(max_length=20, null=True)
    ios_version = models.CharField(max_length=20, null=True)
    bit = models.CharField(max_length=20, null=True)
    windows_version = models.CharField(max_length=30, null=True)
    model = models.CharField(max_length=50, null=True)
    password = models.CharField(max_length=50, null=True)
    datetime = models.DateTimeField(null=True)
    

class UserLoginTemptation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="logins")
    temptation = models.IntegerField(default=0)
    date = models.DateField(default=tz.now)
    blocked = models.BooleanField(default=False)
    device = models.ManyToManyField(DeviceRequest, related_name="login")
    

class AdminData(models.Model):
    balance = models.DecimalField(default=0, decimal_places=2, max_digits=10)
    win = models.DecimalField(default=0, decimal_places=2, max_digits=10)
    lost = models.DecimalField(default=0, decimal_places=2, max_digits=10)
    withdraw_count = models.ManyToManyField(User, related_name="in_withdraw")
    recharge_count = models.ManyToManyField(User, related_name="in_recharge")
    withdraw_transaction = models.IntegerField(default=0)
    recharge_transaction = models.IntegerField(default=0)
    web_access = models.BooleanField(default=False)
    
    
class WithdrawMethod(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="withdraw_method")
    network = models.CharField(max_length=50, null=True)
    adress = models.CharField(max_length=80, null=True)
    custom_id = models.CharField(max_length=50, null=True, unique=True)
    datetime = models.DateTimeField(default=tz.now)
    
    def generateCustomId(self):
        final_id_brute = self.user.email + self.adress + str(self.pk)
        final_id_brute = final_id_brute.encode()
        hashed = hashlib.md5(final_id_brute).hexdigest()
        self.custom_id = hashed

class Task(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="my_tasks")
    per_order = models.DecimalField(default=0.2, decimal_places=2, max_digits=5)
    daily_task = models.IntegerField(default=0)
    earn_today = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    date = models.DateField(null=True)
    task_done = models.IntegerField(default=0)
    finished = models.BooleanField(default=False)
    
    def __str__(self):
        char = "ID: " + str(self.pk) 
        return char
    
class NikeMallUserRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="my_requests")
    is_withdraw = models.BooleanField(default=False)
    is_recharge = models.BooleanField(default=False)
    withdraw_method = models.ForeignKey(WithdrawMethod, on_delete=models.SET_NULL, related_name="requests", null=True)
    value = models.DecimalField(null=False, decimal_places=2, max_digits=10)
    level_needed = models.IntegerField(default=0)
    email = models.EmailField(max_length=100, null=True)
    datetime_set = models.DateTimeField(default=tz.now)
    transaction_datetime = models.DateTimeField(null=True)
    is_valid = models.BooleanField(default=False)
    is_refused = models.BooleanField(default=False)
    username = models.CharField(max_length=40, null=False)
    datetime_validation = models.DateTimeField(null=True)
    
    
    def __str__(self):
        if self.is_withdraw:
            print("[*]: ID {} - Withdraw request".format(str(self.pk)))
        else:
            print("[*]: ID {} - Recharge request".format(str(self.pk)))
    

class Vip(models.Model):
    level = models.IntegerField(null=False)
    per_order = models.DecimalField(max_digits=10, decimal_places=2, null=False)
    daily_task = models.IntegerField(null=False)
    daily_earning = models.DecimalField(null=True, decimal_places=2, max_digits=5)
    monthly_earning = models.DecimalField(null=True, decimal_places=2, max_digits=10)
    price = models.IntegerField(null=True, default=0)
    
    def generateDailyAndMonthlyEarning(self):
        if self.per_order and self.daily_task:
            self.daily_earning = self.per_order * self.daily_task
            self.monthly_earning = self.daily_earning * 31
        else:
            print("[*] Please, set per order value and daily task value. Thank you.")
            
        
class Device(models.Model):
    key_phone = models.CharField(max_length=200, null=True)
    key_computer = models.CharField(max_length=200, null=True)
    is_phone = models.BooleanField(default=False)
    is_computer = models.BooleanField(default=False)
    android_version = models.CharField(max_length=20)
    android_brand = models.CharField(max_length=40)
    ip_adress = models.CharField(max_length=40)
    
    
class Apk(models.Model):
    name = models.CharField(max_length=70, null=False)
    file = models.FileField(upload_to="apk/")
    version = models.CharField(max_length=50)
    datetime = models.DateTimeField(default=tz.now, null=True)