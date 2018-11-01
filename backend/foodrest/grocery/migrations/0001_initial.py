# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-25 20:54
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('food', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='GroceryList',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('deferred', models.BooleanField(default=False)),
                ('food', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='food.Food')),
            ],
        ),
        migrations.CreateModel(
            name='GrocerySection',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sectionName', models.CharField(blank=True, max_length=255, null=True)),
                ('order', models.IntegerField(default=0)),
            ],
            options={
                'ordering': ['order'],
            },
        ),
        migrations.CreateModel(
            name='GroceryStore',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=255, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Staple',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('food', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='food.Food')),
            ],
        ),
        migrations.AddField(
            model_name='grocerysection',
            name='store',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='grocery.GroceryStore'),
        ),
    ]