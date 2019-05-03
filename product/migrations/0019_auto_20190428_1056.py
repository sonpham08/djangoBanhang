# Generated by Django 2.1.1 on 2019-04-28 10:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0018_auto_20190428_1035'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bill',
            name='address',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='bill',
            name='status_product',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='product.StatusProduct'),
        ),
    ]
