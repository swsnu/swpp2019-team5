from django.db import models
from user.models import User
from tag.models import Tag


class Item(models.Model):
    tags = models.ManyToManyField(Tag, related_name='items_with_this_tag')
    category = models.CharField(max_length=15, default='')
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='items_owned_by_user')


