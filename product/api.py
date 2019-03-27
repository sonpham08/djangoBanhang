
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import (Category,Product,DealedProduct,StatusProduct,
Staff, Bill, DetailOrder, Comment)

from .serializers import (CategorySerializer,ProductSerializer,DealedProductSerializer,
StatusProductSerializer,StaffSerializer,BillSerializer,DetailOrderSerializer,CommentSerializer)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = CategorySerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = ProductSerializer

class DealedProductViewSet(viewsets.ModelViewSet):
    queryset = DealedProduct.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = DealedProductSerializer

class StatusProductViewSet(viewsets.ModelViewSet):
    queryset = StatusProduct.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = StatusProductSerializer

class StaffViewSet(viewsets.ModelViewSet):
    queryset = Staff.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = StaffSerializer

class BillViewSet(viewsets.ModelViewSet):
    queryset = Bill.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = BillSerializer

class DetailOrderViewSet(viewsets.ModelViewSet):
    queryset = DetailOrder.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = DetailOrderSerializer

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = CommentSerializer