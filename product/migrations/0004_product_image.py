# Generated by Django 2.1.1 on 2019-04-15 04:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0003_remove_product_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='image',
            field=models.ImageField(max_length=255, null=True, upload_to=''),
        ),
    ]
