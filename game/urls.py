from django.urls import path
# 写法同 BallGame/urls.py

# 添加路由对应的函数，函数写在 game 下面的 views 中
from game.views import index

urlpatterns = [
    path("", index, name='index'),
    # path 将空路由绑定到 index 函数下
    ]
