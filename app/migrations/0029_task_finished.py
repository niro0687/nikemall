# Generated by Django 4.2.2 on 2024-01-05 12:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0028_alter_withdrawmethod_custom_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='finished',
            field=models.BooleanField(default=False),
        ),
    ]
