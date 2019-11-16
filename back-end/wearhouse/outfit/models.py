from django.db import models
from user.models import User
from item.models import Item
import datetime
import os
# Create your models here.


def set_filename_format(now, instance, filename):
    """
    :param now: image uploaded time
    :param instance: an instance of the model where the image file is attached to
    :param filename: given filename
    :return: {username}-{date}-{microsecond}-{extension}
    """
    return "{username}-{date}-{microsecond}-{extension}".format(
        username=instance.user.username,
        date=str(now.date()),
        microsecond=now.microsecond,
        extension=os.path.splitext(filename)[1],
    )


def user_directory_path(instance, filename):
    """
    set the directory path for image uploaded
    e.g)
        images/{year}/{month}/{day}/{username}/{filename}
        images/2019/10/1/julie/julie-2019-10-1-190909.jpg
    """
    now = datetime.datetime.now()
    path = "{filename}".format(
        filename=set_filename_format(now, instance, filename)
    )

    return path


class Outfit(models.Model):
    objects = models.Manager()
    user = models.ForeignKey(User, on_delete = models.CASCADE, related_name= 'outfits_owned_by_user')
    items = models.ManyToManyField(Item, related_name= 'item_list')
    image_link = models.CharField(max_length= 200)
    date = models.DateField()
    satisfaction = models.IntegerField(range(0, 5))
