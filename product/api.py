
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import (Category,Product,DealedProduct,StatusProduct,
Staff, Bill, DetailOrder, Comment, Cart)
from django.contrib.auth import get_user_model

from .serializers import (CategorySerializer,ProductSerializer,DealedProductSerializer,
StatusProductSerializer,StaffSerializer,BillSerializer,DetailOrderSerializer,CommentSerializer,
CartSerializer)
import base64
import os
User=get_user_model()

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
                        price_after_promotion = product.price - product.promotion
                        result = {
                            "product_id": product.product_id,
                            "name": product.name,
                            "price": product.price,
                            "size":product.size,
                            "quantity": product.quantity,
                            "rating": product.rating,
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
                            },
                            "price_after_promotion": price_after_promotion
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

class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = CartSerializer

    @action(detail=False)
    def get_my_cart(self, request):
        req_user = request.user
        res=[]
        res2={}
        try:
            products = Product.objects.all()
            carts = Cart.objects.all()
            for cart in carts:
                if cart.user.id == req_user.id:
                    for product in products:
                        if product.product_id == cart.product.product_id:
                            json = {
                                    "cart_id": cart.cart_id,
                                    "product_id": product.product_id,
                                    "name": product.name,
                                    "price": product.price,
                                    "image": str(product.image),
                                    "size":product.size,
                                    "quantity": product.quantity,
                                    "rating": product.rating,
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
                            }   
                            res.append(json)     
            res2 = {
                "user": req_user.id,
                "product": res
            }
            return Response(res2, 200)
        except Exception as e:
            return Response({
                "Error": repr(e)
            }, 400)

            
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

    @action(detail=False)
    def get_bill_with_product(self, request):
        # req_user = request.user
        res = {}
        get_user = ""
        bill_list = []
        res2 = []
        try:
            bills = Bill.objects.all()
            details = DetailOrder.objects.all()
            users = User.objects.all()
            products = Product.objects.all()
            for user in users:
                get_user = user.id
                for bill in bills:
                    if bill.user.id == get_user:
                        for detail in details:
                            if detail.bill.bill_id == bill.bill_id:
                                response = {
                                    "bill_id": detail.bill.bill_id,
                                    "product_id": detail.product.product_id
                                }
                                bill_list.append(response)
                                
                                res = {
                                    "user": bill.user.id,
                                    "bill": bill_list
                                }
                                res2.append(res)
            return Response(res2,200)
        except Exception as e:
            return Response({
                "Error": repr(e)
            }, 400)

class DetailOrderViewSet(viewsets.ModelViewSet):
    queryset = DetailOrder.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = DetailOrderSerializer

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = CommentSerializer