# Generated by Django 2.1.1 on 2019-03-19 12:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='address',
            field=models.CharField(default='unknow', max_length=255),
        ),
        migrations.AddField(
            model_name='user',
            name='cmnd',
            field=models.CharField(default='unknow', max_length=15),
        ),
        migrations.AddField(
            model_name='user',
            name='phone',
            field=models.CharField(default='unknow', max_length=12),
        ),
    ]
