from django.http import JsonResponse

from game.models.models_of_player.player import Player

def get_info_acapp(request):
    pass

def get_info_web(request):
    player = Player.objects.all()[0]
    return JsonResponse({
        'result': "success",
        'username': player.user.username,
        'photo': player.photo,
    })
    pass

def get_info(request):
    platfrom = request.GET.get('platfrom')
    # 手动传入一个名字叫做 platfrom 的属性
    if platfrom == "ACAPP":
        return get_info_acapp(request)
    else:
        return get_info_web(request)