# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-28 01:51
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('grocery', '0003_auto_20171125_2112'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='grocerylist',
            name='id',
        ),
        migrations.AlterField(
            model_name='grocerylist',
            name='food',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='food.Food'),
        ),
    ]
