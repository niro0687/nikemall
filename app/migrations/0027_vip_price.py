# Generated by Django 4.2.2 on 2024-01-04 10:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0026_rename_transaction_admindata_recharge_transaction_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='vip',
            name='price',
            field=models.IntegerField(default=0, null=True),
        ),
    ]