from rest_framework import serializers
from .models import Order, OrderItem
from menu.serializers import MenuItemSerializer


class OrderItemSerializer(serializers.ModelSerializer):
    menu_item_detail = MenuItemSerializer(source='menu_item', read_only=True)
    subtotal = serializers.ReadOnlyField()

    class Meta:
        model = OrderItem
        fields = ['id', 'menu_item', 'menu_item_detail', 'quantity', 'unit_price', 'subtotal', 'notes']
        read_only_fields = ['unit_price']


class OrderItemCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['menu_item', 'quantity', 'notes']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'user', 'username', 'status', 'status_display',
            'table_number', 'notes', 'total', 'items',
            'created_at', 'updated_at',
        ]
        read_only_fields = ['user', 'total', 'created_at', 'updated_at']


class OrderCreateSerializer(serializers.ModelSerializer):
    items = OrderItemCreateSerializer(many=True, write_only=True)

    class Meta:
        model = Order
        fields = ['table_number', 'notes', 'items']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(user=self.context['request'].user, **validated_data)
        for item_data in items_data:
            menu_item = item_data['menu_item']
            OrderItem.objects.create(
                order=order,
                menu_item=menu_item,
                quantity=item_data.get('quantity', 1),
                unit_price=menu_item.price,
                notes=item_data.get('notes', ''),
            )
        order.calculate_total()
        return order
