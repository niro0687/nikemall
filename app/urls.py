from django.urls import path
from .views import *

app_name = "app"

urlpatterns = [
    path("admin/", homeAdmin, name="admin"),
    path("register/", register, name="register"),
    path("all_users/", getAllUsers, name="get_all_users"),
    path("", main, name="main"),
    path("preview_vip_requests/", vip_requests, name="vip_requests"),
    path("upload_apk/", upload_apk, name="upload_apk"),
    path("web_access/", web_access, name="web_access"),
    path("valid_request/<int:pk>/", valid_request, name="valid_request"),
    path("deny_request/<int:pk>/", refuse_request, name="refuse_request"),
    path("change_password/", change_password, name="change_my_password"),
    path("change_transaction_password/", change_transaction_password, name="change_transaction_password"),
    path("do_task/", do_task, name="do_task"),
    path("logout/", logout_view, name="logout_view"),
    path("login/<str:code>/", loginView, name="login_view"),
    path("login/", justLogin, name="just_login"),
    path("admin_change_user_password/", admin_change_user_password, name="admin_change_user_password"),
    path("set_withdraw_method/", set_withdraw_method, name="set_withdraw_method"),
    path("update_vip/", update_vip, name="update_vip"),
    path("get_my_all_withdraw_methods/", get_my_all_withdraw_methods, name="get_my_all_withdraw_methods"),
    path("change_admin_password", change_admin_password, name="change_admin_password"),
    path("reg/<str:code>/", reg, name="reg"),
    path("check_admin_password", check_admin_password, name="check_admin_password"),
    path("get_withdraw/", get_withdraw, name="get_withdraw"),
    path("search_users/", search_users, name="search_users"),
    path("preview_withdraw_requests/", withdraw_requests, name="vip_requests"),
    path("user/vip/<int:vip>/", getlistvip, name="get_list_vip"),
    path("login/", loginView, name="login_view"),
]