# view 函数用来存储一些函数的实现
from django.http import HttpResponse

# 定义一个 index 函数，传入 request 参数
def index(requset):
    # httpResponse 中返回一个字符串
    return HttpResponse("<h1>my first homwpagw</h1>")


