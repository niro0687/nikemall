# Generated by Django 4.2.2 on 2023-12-14 04:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_secondinfo_p'),
    ]

    operations = [
        migrations.AddField(
            model_name='nikemalluserrequest',
            name='is_refused',
            field=models.BooleanField(default=False),
        ),
    ]
