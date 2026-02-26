from django.contrib import admin
from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ['unit_price', 'subtotal']


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'status', 'table_number', 'total', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['user__username']
    readonly_fields = ['total', 'created_at', 'updated_at']
    inlines = [OrderItemInline]
    ordering = ['-created_at']
