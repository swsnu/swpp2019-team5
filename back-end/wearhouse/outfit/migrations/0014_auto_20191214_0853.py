# Generated by Django 2.2.6 on 2019-12-14 08:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('outfit', '0013_auto_20191212_2000'),
    ]

    operations = [
        migrations.AlterField(
            model_name='outfit',
            name='dateWithTime',
            field=models.CharField(default='', max_length=255, null=True),
        ),
    ]