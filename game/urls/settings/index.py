#!/usr/bin/env python
# encoding: utf-8

from django.urls import path


# 把 views 中的函数放入

from game.views.settings.get_info import get_info

urlpatterns = [
    path("get_info/", get_info, name="settings_get_info"),
]