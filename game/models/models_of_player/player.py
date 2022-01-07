# 继承django数据库的基类
from django.db import models
from django.contrib.auth.models import User

# 继承的类写在括号中


class Player(models.Model):
    # 定义关联关系，每个player对应一个user
    # 当user被删除，对应的player也被删除
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    photo = models.URLField(max_length=256, blank=True)

    # 显示每个player的数据在后台的名字
    def __str__(self):
        return str(self.user)