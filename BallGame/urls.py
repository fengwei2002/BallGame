"""BallGame URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [

    path('', include('game.urls.index')),

    # 这里的 path 如果不加 'game/' 这个参数，改为 '', 的话，就会在根路由下
    # 调用 game 下面的 urls.py ，而 game/urls.py 是在 "" 路由下，调用了一个 index 函数
    # 而 index 函数在 game/views.py 下实现
    path('admin/', admin.site.urls),

]
