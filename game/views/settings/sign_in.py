# 验证用户有没有登录

from django.contrib.auth import authenticate, login
from django.http import JsonResponse

def sign_in(request):
    data = request.GET  
    username = data.get('username')
    password = data.get('password')
    user = authenticate(username=username, password=password)
    if not user:
        return JsonResponse({
            'result': "用户名或者密码不正确, 请重新输入",
        })
    login(request, user)
    return JsonResponse({
        'result': "success"
    })
