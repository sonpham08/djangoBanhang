# Generated by Django 2.1.1 on 2019-04-20 08:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0009_auto_20190420_0807'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='category',
            name='quantity',
        ),
        migrations.AddField(
            model_name='product',
            name='quantity',
            field=models.IntegerField(default=0),
        ),
    ]