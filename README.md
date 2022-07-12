## web 端实现的 MOBA 类游戏

前端使用原生 JS 实现
后端使用 Django 框架完成

支持多人对战以及同一局游戏内的在线聊天室
支持人机对战选择难度

## 预览效果

## web 端实现的 MOBA 类游戏


前端使用原生 JS 实现
后端使用 Django 框架完成

支持多人对战以及同一局游戏内的在线聊天室
支持人机对战选择难度

## 预览效果

```sh
django-admin --version 
django-admin startproject ballgame
python3 manage.py runserver 0.0.0.0:8080
python3 manage.py startapp game

python3 manage.py migrate #同步一下数据库的修改
python3 manage.py createsuperuser # 创建管理员账号
python3 manage.py runserver 0.0.0.0:8000 # 启动控制台
```

```
47.97.213.122:8080

models，views，urls，templates

models，数据类库，定义各种数据类型
	class User
views，实现各种函数，做成文件夹，防止多个函数放进同一个文件里面，比较麻烦
urls，路由库，用于解析访问网站时要干嘛
templates，存 html

python3 manage.py makemigrations
python3 manage.py migrate
```





