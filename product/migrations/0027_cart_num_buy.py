# Generated by Django 2.1.1 on 2019-05-27 00:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0026_flashproduct'),
    ]

    operations = [
        migrations.AddField(
            model_name='cart',
            name='num_buy',
            field=models.IntegerField(default=0),
        ),
    ]
