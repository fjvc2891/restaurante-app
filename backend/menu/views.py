from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser
from django_filters.rest_framework import DjangoFilterBackend
from .models import Category, MenuItem
from .serializers import CategorySerializer, MenuItemSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAdminUser()]
        return super().get_permissions()


class MenuItemViewSet(viewsets.ModelViewSet):
    serializer_class = MenuItemSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        qs = MenuItem.objects.filter(available=True)
        category = self.request.query_params.get('category')
        featured = self.request.query_params.get('featured')
        search = self.request.query_params.get('search')

        if category:
            qs = qs.filter(category__slug=category)
        if featured:
            qs = qs.filter(featured=True)
        if search:
            qs = qs.filter(name__icontains=search)
        return qs

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAdminUser()]
        return super().get_permissions()

    @action(detail=False, methods=['get'])
    def featured(self, request):
        items = self.get_queryset().filter(featured=True)
        serializer = self.get_serializer(items, many=True)
        return Response(serializer.data)
