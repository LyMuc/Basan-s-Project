# Generated by Django 5.0.7 on 2024-07-25 09:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_remove_task_alive_remove_task_cap_bac_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='deadline',
            field=models.DateTimeField(null=True),
        ),
    ]
