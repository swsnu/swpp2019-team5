from django.db import models
from user.models import User


class Tag(models.Model):
    name = models.CharField(max_length=20)
    user = models.ForeignKey(User, on_delete= models.CASCADE, related_name='tags_owned_by_user')

