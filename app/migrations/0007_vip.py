# Generated by Django 4.2.2 on 2023-12-15 04:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0006_nikemalluserrequest_is_refused'),
    ]

    operations = [
        migrations.CreateModel(
            name='Vip',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('level', models.IntegerField()),
                ('per_order', models.FloatField()),
                ('daily_task', models.IntegerField()),
            ],
        ),
    ]