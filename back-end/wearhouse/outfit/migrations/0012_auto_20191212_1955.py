# Generated by Django 2.2.6 on 2019-12-12 19:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('outfit', '0011_merge_20191212_0705'),
    ]

    operations = [
        migrations.AlterField(
            model_name='outfit',
            name='date',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='outfit',
            name='tempAvg',
            field=models.IntegerField(default=100),
        ),
    ]
