from django.contrib.auth import logout
from django.http import JsonResponse

def sign_out(request):
    user = request.user
    if not user.is_authenticated:
        return JsonResponse({
            'result': "已经不是登录状态",
        })
    logout(request)
    # logout request 就是把 cookies 从 request 中删掉
    return JsonResponse({
        'result': "logout_success"
    })