# Generated by Django 2.1.1 on 2019-05-09 14:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0022_comment_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='customer_comment_name',
        ),
        migrations.RemoveField(
            model_name='comment',
            name='customer_comment_phone',
        ),
        migrations.AlterField(
            model_name='comment',
            name='time_comment',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
