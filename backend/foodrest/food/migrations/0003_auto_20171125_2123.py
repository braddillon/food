# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-25 21:23
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('food', '0002_staple'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='staple',
            name='food',
        ),
        migrations.AddField(
            model_name='food',
            name='staple',
            field=models.BooleanField(default=False),
        ),
        migrations.DeleteModel(
            name='Staple',
        ),
    ]
