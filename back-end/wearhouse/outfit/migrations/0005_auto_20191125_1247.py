# Generated by Django 2.2.6 on 2019-11-25 12:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('outfit', '0004_auto_20191125_1240'),
    ]

    operations = [
        migrations.AlterField(
            model_name='outfit',
            name='satisfaction',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
