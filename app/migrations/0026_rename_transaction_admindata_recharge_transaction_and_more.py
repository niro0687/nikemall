# Generated by Django 4.2.2 on 2024-01-03 07:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0025_admindata_transaction'),
    ]

    operations = [
        migrations.RenameField(
            model_name='admindata',
            old_name='transaction',
            new_name='recharge_transaction',
        ),
        migrations.AddField(
            model_name='admindata',
            name='withdraw_transaction',
            field=models.IntegerField(default=0),
        ),
    ]
