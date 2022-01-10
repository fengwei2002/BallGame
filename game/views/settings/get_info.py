from django.http import JsonResponse

from game.models.models_of_player.player import Player
# 读入手动创建的数据库


def get_info_acapp(request):
    pass


def get_info_web(request):
    player = Player.objects.all()[0]
    return JsonResponse({
        'result': "success",
        'paltfrom': "pla",
        'username': player.user.username,
        'photo': player.photo,
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
            'paltfrom': platform,
        })
