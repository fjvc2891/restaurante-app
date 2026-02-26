from django.db import models
from django.contrib.auth.models import User
from menu.models import MenuItem


class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pendiente'),
        ('confirmed', 'Confirmado'),
        ('preparing', 'En preparación'),
        ('ready', 'Listo'),
        ('delivered', 'Entregado'),
        ('cancelled', 'Cancelado'),
    ]

    user = models.ForeignKey(User, related_name='orders', on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    table_number = models.PositiveIntegerField(null=True, blank=True)
    notes = models.TextField(blank=True)
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Pedido #{self.id} - {self.user.username} ({self.status})"

    def calculate_total(self):
        self.total = sum(item.subtotal for item in self.items.all())
        self.save(update_fields=['total'])


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    menu_item = models.ForeignKey(MenuItem, on_delete=models.PROTECT)
    quantity = models.PositiveIntegerField(default=1)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    notes = models.TextField(blank=True)

    @property
    def subtotal(self):
        return self.unit_price * self.quantity

    def __str__(self):
        return f"{self.quantity}x {self.menu_item.name}"
