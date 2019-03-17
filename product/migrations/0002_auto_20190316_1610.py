# Generated by Django 2.1.1 on 2019-03-16 16:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('user', '0001_initial'),
        ('product', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='bill',
            name='customer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user.Customer'),
        ),
        migrations.AddField(
            model_name='bill',
            name='staff',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product.Staff'),
        ),
        migrations.AddField(
            model_name='bill',
            name='status_product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product.StatusProduct'),
        ),
    ]
