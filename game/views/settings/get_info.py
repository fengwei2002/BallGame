from django.http import JsonResponse
from game.models.models_of_player.player import Player
# 读入手动创建的数据库

from django.contrib.auth.models import User

def get_info_acapp(request):
    data = request.GET
    username = data.get("username", "").strip()
    password = data.get("password", "").strip()
    platform = data.get('platform', "").strip()
    pass


def get_info_web(request):
    data = request.GET
    username = data.get("username", "").strip()
    platform = data.get('platform', "").strip()

    user = User.objects.filter(username=username)
    if not user.is_authenticated:
        return JsonResponse({
            'result': "have_not_sign_in "
        })
    else:
        player = Player.objects.get(user=user)
        return JsonResponse({
            'result': "success",
            'platform': "WEB",
            'username': player.user.username,
            'photo': "https://img2.baidu.com/it/u=2161949891,656888789&fm=26&fmt=auto",
        })


def get_info(request):
    platform = request.GET.get('platform')
    # 手动传入一个名字叫做 platform 的属性
    if platform == "ACAPP":
        get_info_acapp(request)
    elif platform == "WEB":
        return get_info_web(request)
    else:
        return JsonResponse({
            'result': "success",
            'username': username,
            'password': password,
            'platform': platform,
        })
