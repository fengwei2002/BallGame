#!/usr/bin/env python
# encoding: utf-8

# 用来将这个路径下面的路径，全部 include 下来

from django.urls import path, include
# 仿照 BallGame 下面的 urls.py 写这个 urls 匹配

from game.views.index import index

urlpatterns = [
    path("", index, name='index'),
    path("menu/", include("game.urls.menu.index")), # 注意这里没有 .py
    path("palyground/", include("game.urls.playground.index")), # 并且 include 函数接收的是一个字符串
    path("settings/", include("game.urls.settings.index")),
]
