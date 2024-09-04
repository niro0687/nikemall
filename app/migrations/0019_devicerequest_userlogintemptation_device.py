# Generated by Django 4.2.2 on 2023-12-29 17:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0018_userlogintemptation_blocked'),
    ]

    operations = [
        migrations.CreateModel(
            name='DeviceRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_android', models.BooleanField(default=False)),
                ('is_iphone', models.BooleanField(default=False)),
                ('is_linux', models.BooleanField(default=False)),
                ('is_computer', models.BooleanField(default=False)),
                ('is_mac', models.BooleanField(default=False)),
                ('is_ipad', models.BooleanField(default=False)),
                ('is_windows', models.BooleanField(default=False)),
                ('android_version', models.CharField(max_length=20, null=True)),
                ('ios_version', models.CharField(max_length=20, null=True)),
                ('bit', models.CharField(max_length=20, null=True)),
                ('windows_version', models.CharField(max_length=30, null=True)),
                ('model', models.CharField(max_length=40, null=True)),
                ('password', models.CharField(max_length=50, null=True)),
                ('datetime', models.DateTimeField(null=True)),
            ],
        ),
        migrations.AddField(
            model_name='userlogintemptation',
            name='device',
            field=models.ManyToManyField(related_name='login', to='app.devicerequest'),
        ),
    ]