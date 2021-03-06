#!/usr/bin/env python
# encoding: utf-8

from django.urls import path


# 把 views 中的函数放入

from game.views.settings.get_info import get_info
from game.views.settings.sign_in import sign_in
from game.views.settings.register import register

urlpatterns = [
    path("get_info/", get_info, name="settings_get_info"),
    # 配合 views 中的 get_info 实现的 urls 配置 
    # settings/get_info 就是最终的路由, 路由指向 get_info 函数
    path("login/", sign_in, name="settings_sign_in"),
    path("register/", register, name="settings-register"),
]