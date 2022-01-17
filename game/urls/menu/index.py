#!/usr/bin/env python
# encoding: utf-8

from django.urls import path

# 把 views 中的函数放入

from game.views.menu.logout import sign_out
urlpatterns = [
    path("sign_out/", sign_out, name="menu_sign_out"),
]