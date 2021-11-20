#!/usr/bin/env python
# encoding: utf-8

# 总函数，会在 web 端被调用，主要作用返回 multiends 下的 html 文件

from django.shortcuts import render
# django 中的 api。 引入 render 函数


def index(request):
    return render(request, "multiends/web.html")


