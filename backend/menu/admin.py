from django.contrib import admin
from .models import Category, MenuItem


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'icon', 'order']
    prepopulated_fields = {'slug': ('name',)}
    ordering = ['order']


@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price', 'available', 'featured']
    list_filter = ['category', 'available', 'featured']
    list_editable = ['available', 'featured', 'price']
    search_fields = ['name', 'description']
