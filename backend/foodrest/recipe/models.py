from django.db import models
from django.db.models.signals import pre_save, post_save
from django.conf import settings
from django.core.files import File
from django.core.files.base import ContentFile
from django.utils.text import slugify
from django.dispatch import receiver
import re

from taggit.managers import TaggableManager
from PIL import Image
import shutil
import os

from food.models import Food

def upload_location(instance, filename):
	return "%s/%s" %(instance.slug, filename)

# Create your models here.
class RecipeSection(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.name

class Recipe(models.Model):
	name = models.CharField(max_length=255)
	slug = models.SlugField(unique=True)
	image = models.ImageField(upload_to=upload_location, null=True, blank=True,
		width_field="width_field",
		height_field="height_field")

	height_field = models.IntegerField(default=0,null=True, blank=True)
	width_field = models.IntegerField(default=0,null=True, blank=True)
	tags = TaggableManager(blank=True)
	source = models.URLField(null=True, blank=True)

	def __str__(self):
		return self.name	

	def get_smallThumb_url(self):
		qs = Thumbnail.objects.filter(recipe=self,type="small")
		return qs[0].media.url

	def get_mediumThumb_url(self):
		qs = Thumbnail.objects.filter(recipe=self,type="medium")
		return qs[0].media.url

def thumbnail_location(instance, filename):
    	return "%s/%s" %(instance.recipe.slug, filename)



class Thumbnail(models.Model):
	recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='thumbnail')
	height = models.CharField(max_length=20, null=True, blank=True)
	width = models.CharField(max_length=20, null=True, blank=True)
	media = models.ImageField(width_field = "width",
		height_field = "height",
		blank=True,
		null=True,
		upload_to=thumbnail_location,
	)

	def __str__(self):
		path = "path unknown"
		if self.media:
			path = str(self.media.path)
		return path



def create_new_thumb(media_path, instance, owner_slug, max_length, max_width):
		filename = os.path.basename(media_path)
		print("FILENAME", flush=True)
		print(filename, flush=True)
		idx = filename.index('.')
		filename = filename[:idx] + '_thumb' + filename[idx:]

		thumb = Image.open(media_path)

		size = (max_length, max_width)

		thumb.thumbnail(size, Image.ANTIALIAS)

		temp_loc = "%s/%s/tmp" %(settings.MEDIA_ROOT, owner_slug)

		if not os.path.exists(temp_loc):
			os.makedirs(temp_loc)

		temp_file_path = os.path.join(temp_loc, filename)
		if os.path.exists(temp_file_path):
			temp_path = os.path.join(temp_loc, "%s" %(random.random()))
			os.makedirs(temp_path)
			temp_file_path = os.path.join(temp_path, filename)

		print("temp_file_path", temp_file_path)
		temp_image = open(temp_file_path, "wb")
		thumb.save(temp_image, format='jpeg')
		thumb_data = open(temp_file_path, "rb")
		
		instance.media.save(filename, ContentFile(thumb_data.read()), save=False)
		instance.save()

		shutil.rmtree(temp_loc, ignore_errors=True)
		return True

@receiver(models.signals.post_delete, sender=Recipe)
def auto_delete_file_on_delete(sender, instance, **kwargs):
	"""
	Deletes file from filesystem
	when corresponding `MediaFile` object is deleted.
	"""
	if instance.image:
		if (os.path.isfile(instance.image.path) and ('.' in instance.image.path)):
			idx = instance.image.path.index('.')
			thumbFile = instance.image.path[:idx] + '_thumb' + instance.image.path[idx:]
			print("recipe delete" + os.path.dirname(instance.image.path), flush=True)
			os.remove(instance.image.path)
			os.remove(thumbFile)
			os.rmdir(os.path.dirname(instance.image.path))
			#

# @receiver(models.signals.post_delete, sender=Thumbnail)
# def auto_delete_file_on_delete(sender, instance, **kwargs):
# 	"""
# 	Deletes file from filesystem
# 	when corresponding `MediaFile` object is deleted.
# 	"""
# 	print("thumb delete", flush=True)
# 	if instance.media:
# 		if os.path.isfile(instance.media.path):
# 			os.remove(instance.media.path)


def recipe_post_save_receiver(sender, instance, created, *args, **kwargs):
	if instance.image:
		thumb, thumb_created = Thumbnail.objects.get_or_create(recipe=instance)

		media_path = instance.image.path
		owner_slug = instance.slug

		if thumb_created:
			create_new_thumb(media_path, thumb, owner_slug, 350, 350)

post_save.connect(recipe_post_save_receiver, sender=Recipe)


def create_slug(instance, new_slug=None):
	slug = slugify(instance.name)
	if new_slug is not None:
		slug = new_slug
	qs = Recipe.objects.filter(slug__startswith=slug).order_by("-id")
	exists = qs.exists()
	if exists:
		m = re.search(r'\d+$', qs.first().slug)
		if m is not None:
			new_slug = f"{slug}{int(m.group())+1}"
		else:
			new_slug = f"{slug}{2}"
		return create_slug(instance, new_slug=new_slug)
	return slug

def pre_save_recipe_receiver(sender, instance, *args, **kwargs):
	if not instance.slug:
		instance.slug = create_slug(instance)
pre_save.connect(pre_save_recipe_receiver, sender=Recipe)

class Ingredient(models.Model):
    name = models.CharField(max_length=255)
    units = models.CharField(max_length=255)
    amount = models.CharField(max_length=255)
    notes = models.CharField(max_length=255)
    food = models.ForeignKey(Food, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='ingredients')
    section = models.ForeignKey(RecipeSection, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Direction(models.Model):
    text = models.TextField()
    sort = models.IntegerField()
    section = models.ForeignKey(RecipeSection, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='directions')

    def __str__(self):
        return str(self.text)

