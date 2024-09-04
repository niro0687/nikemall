# Generated by Django 4.2.2 on 2023-12-30 08:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0020_devicerequest_ip'),
    ]

    operations = [
        migrations.AlterField(
            model_name='admindata',
            name='balance',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
        migrations.AlterField(
            model_name='admindata',
            name='lost',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
        migrations.AlterField(
            model_name='admindata',
            name='win',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
        migrations.AlterField(
            model_name='nikemalluserrequest',
            name='value',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
        migrations.AlterField(
            model_name='secondinfo',
            name='balance',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
        migrations.AlterField(
            model_name='secondinfo',
            name='per_order',
            field=models.DecimalField(decimal_places=2, default=0.2, max_digits=5),
        ),
        migrations.AlterField(
            model_name='secondinfo',
            name='team_recharge',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
        migrations.AlterField(
            model_name='secondinfo',
            name='team_withdraw',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
        migrations.AlterField(
            model_name='secondinfo',
            name='total_earn',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
        migrations.AlterField(
            model_name='task',
            name='earn_today',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
        migrations.AlterField(
            model_name='task',
            name='per_order',
            field=models.DecimalField(decimal_places=2, default=0.2, max_digits=5),
        ),
        migrations.AlterField(
            model_name='vip',
            name='daily_earning',
            field=models.DecimalField(decimal_places=2, max_digits=5, null=True),
        ),
        migrations.AlterField(
            model_name='vip',
            name='monthly_earning',
            field=models.DecimalField(decimal_places=2, max_digits=10, null=True),
        ),
        migrations.AlterField(
            model_name='vip',
            name='per_order',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
    ]