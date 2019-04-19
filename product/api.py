
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

    @action(detail=False)
    def get_product(self, request):
        res=[]
        try:
            products = Product.objects.all()
            categories = Category.objects.all()
            for product in products:
                for category in categories:
                    if product.category.category_id  == category.category_id:
                        result = {
                            "product_id": product.product_id,
                            "name": product.name,
                            "price": product.price,
                            "quantity": product.quantity,
                            "size":product.size,
                            "weight": product.weight,
                            "color": product.color,
                            "sound": product.sound,
                            "memory": product.memory,
                            "camera": product.camera,
                            "pin": product.pin,
                            "gurantee": product.gurantee,
                            "promotion": product.promotion,
                            "start_promo": product.start_promo,
                            "end_promo": product.end_promo,
                            "category": {
                                "category_id": category.category_id,
                                "name": category.name
                            }
                        }
                        res.append(result)
            return Response(res, 200)
        except Exception as e:
            return Response({
                "Error": repr(e)
            }, 400)

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