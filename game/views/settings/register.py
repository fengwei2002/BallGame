from django.http import JsonResponse
from django.contrib.auth import login
from django.contrib.auth.models import User
from game.models.models_of_player.player import Player


def register(request):
    data = request.GET
    username = data.get("username", "").strip()
    # 没有的话，返回空，把用户名的前后空格都去掉
    password = data.get("password", "").strip()
    repeat_password = data.get("repeat_password", "").strip()

    if not username or not password:
        return JsonResponse({
            'result': "用户名和密码不能为空"
        })
    if password != repeat_password:
        return JsonResponse({
            'result': "两次输入的密码不一致"
        })
    if User.objects.filter(username=username).exists():
        return JsonResponse({
            'result': "用户名密码已经存在"
        })
    user = User(username=username)
    user.set_password(password)
    user.save()

    # 注册用户获得默认头像
    photo_src = "https://img2.baidu.com/it/u=2161949891,656888789&fm=26&fmt=auto"
    Player.objects.create(user=user, photo=photo_src)
    login(request, user)
    return JsonResponse({
        'result': "success",
        'username': username,
        'photo': photo_src
    })
