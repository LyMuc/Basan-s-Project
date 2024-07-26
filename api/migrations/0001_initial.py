# Generated by Django 5.0.7 on 2024-07-11 09:55

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100, unique=True)),
                ('cap_bac', models.CharField(max_length=100)),
                ('alive', models.BooleanField()),
                #('date_of_die',models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
