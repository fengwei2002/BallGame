from django.contrib import admin

# Register your models here.

# 注册数据表

from game.models.models_of_player.player import Player

admin.site.register(Player)

# uwsgi --ini scripts/uwsgi.ini 重启 uwsgi 服务
# 每一次定义完数据库之后，都要将数据表更新到数据库中 
# python3 manage.py makemigrations
# python3 manage.py migrate
# 执行完之后，我们定义的表就会应用到数据库中