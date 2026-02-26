from rest_framework import serializers
from .models import Category, MenuItem


class MenuItemSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = MenuItem
        fields = [
            'id', 'name', 'description', 'price',
            'image', 'image_url', 'available', 'featured',
            'category', 'category_name', 'created_at',
        ]
        read_only_fields = ['created_at']

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None


class CategorySerializer(serializers.ModelSerializer):
    items = MenuItemSerializer(many=True, read_only=True)
    item_count = serializers.IntegerField(source='items.count', read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'icon', 'order', 'item_count', 'items']
