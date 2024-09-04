# Generated by Django 4.2.2 on 2023-12-24 03:02

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('app', '0013_alter_nikemalluserrequest_transaction_datetime'),
    ]

    operations = [
        migrations.AddField(
            model_name='admindata',
            name='recharge_count',
            field=models.ManyToManyField(related_name='in_recharge', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='admindata',
            name='withdraw_count',
            field=models.ManyToManyField(related_name='in_withdraw', to=settings.AUTH_USER_MODEL),
        ),
    ]
