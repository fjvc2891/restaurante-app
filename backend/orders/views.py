from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import Order
from .serializers import OrderSerializer, OrderCreateSerializer


class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            qs = Order.objects.all()
            order_status = self.request.query_params.get('status')
            if order_status:
                qs = qs.filter(status=order_status)
            return qs
        return Order.objects.filter(user=user)

    def get_serializer_class(self):
        if self.action == 'create':
            return OrderCreateSerializer
        return OrderSerializer

    def perform_create(self, serializer):
        serializer.save()

    @action(detail=True, methods=['patch'], permission_classes=[IsAdminUser])
    def update_status(self, request, pk=None):
        order = self.get_object()
        new_status = request.data.get('status')
        valid_statuses = dict(Order.STATUS_CHOICES)
        if new_status not in valid_statuses:
            return Response(
                {'error': f'Estado inválido. Opciones: {list(valid_statuses.keys())}'},
                status=status.HTTP_400_BAD_REQUEST
            )
        order.status = new_status
        order.save(update_fields=['status'])
        return Response(OrderSerializer(order).data)

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def cancel(self, request, pk=None):
        order = self.get_object()
        if order.user != request.user and not request.user.is_staff:
            return Response({'error': 'No autorizado'}, status=403)
        if order.status in ['delivered', 'cancelled']:
            return Response({'error': 'No se puede cancelar este pedido'}, status=400)
        order.status = 'cancelled'
        order.save(update_fields=['status'])
        return Response({'message': 'Pedido cancelado', 'status': order.status})
