# Generated by Django 2.1.3 on 2018-11-26 17:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('recipe', '0008_auto_20181125_1251'),
    ]

    operations = [
        migrations.DeleteModel(
            name='File',
        ),
        migrations.RemoveField(
            model_name='thumbnail',
            name='type',
        ),
    ]
