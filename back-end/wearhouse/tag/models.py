from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Tag(models.Model):
    name = models.CharField(max_length=200)
    user = models.ForeignKey(User, on_delete= models.CASCADE, related_name= 'tags_owned_by_user')
