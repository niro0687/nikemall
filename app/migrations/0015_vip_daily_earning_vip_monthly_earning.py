# Generated by Django 4.2.2 on 2023-12-27 16:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0014_admindata_recharge_count_admindata_withdraw_count'),
    ]

    operations = [
        migrations.AddField(
            model_name='vip',
            name='daily_earning',
            field=models.FloatField(null=True),
        ),
        migrations.AddField(
            model_name='vip',
            name='monthly_earning',
            field=models.FloatField(null=True),
        ),
    ]
