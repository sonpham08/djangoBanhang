# Generated by Django 2.1.1 on 2019-06-08 07:33

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0028_auto_20190529_1242'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bill',
            name='user',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='dealedproduct',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='product.Product'),
        ),
        migrations.AlterField(
            model_name='detailorder',
            name='bill',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.DO_NOTHING, to='product.Bill'),
        ),
        migrations.AlterField(
            model_name='detailorder',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='product.Product'),
        ),
    ]
