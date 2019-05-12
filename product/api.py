
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
import time
import moment
import datetime

User=get_user_model()

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = CategorySerializer

    @action(detail=False)
    def statistic_category_in_product(self, request):
        res=[]
        res2=[]
        try:
            products = Product.objects.all()
            categories = Category.objects.all()
            for category in categories:
                res.append({
                    "category_id": category.category_id,
                    "name": category.name,
                    "memory": [
                        product.memory
                    for product in products if product.category.category_id == category.category_id],
                    "camera": [
                        product.camera
                    for product in products if product.category.category_id == category.category_id],
                    "price": [
                        product.price
                    for product in products if product.category.category_id == category.category_id],
                })
                    
            return Response(res, 200)
        except Exception as e:
            return Response({
                "Error": repr(e)
            }, 400)

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = ProductSerializer
    
    @action(detail=False)
    def get_product_hightlight(self, request):
        res=[]
        try:
            products = Product.objects.all()
            dealed = DealedProduct.objects.all()
            categories = Category.objects.all()
            for deal in dealed:
                res.append({
                    "product_id": deal.product.product_id,
                    "name": deal.product.name,
                    "price": deal.product.price,
                    "image": str(deal.product.image),
                    "size":deal.product.size,
                    "quantity": deal.product.quantity,
                    "rating": deal.product.rating,
                    "hdh": deal.product.hdh,
                    "color": deal.product.color,
                    "CPU": deal.product.CPU,
                    "memory": deal.product.memory,
                    "camera": deal.product.camera,
                    "pin": deal.product.pin,
                    "gurantee": deal.product.gurantee,
                    "promotion": deal.product.promotion,
                    "start_promo": deal.product.start_promo,
                    "end_promo": deal.product.end_promo,
                    "category": [{
                        "category_id": category.category_id,
                        "name": category.name
                    }for category in categories if category.category_id == deal.product.category.category_id]
                })
            return Response(res, 200)
        except Exception as e:
            return Response({
                "Error": repr(e)
            }, 400)
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
                            "image": str(product.image),
                            "size":product.size,
                            "quantity": product.quantity,
                            "rating": product.rating,
                            "hdh": product.hdh,
                            "color": product.color,
                            "CPU": product.CPU,
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

    @action(detail=False)
    def get_product_promotion(self, request):
        res=[]
        try:
            products = Product.objects.all()
            categories = Category.objects.all()
            for product in products:
                if product.promotion != 0 and str(datetime.datetime.now()) <= str(product.end_promo):
                    for category in categories:
                        if product.category.category_id  == category.category_id:
                            price_after_promotion = product.price - product.promotion
                            result = {
                                "product_id": product.product_id,
                                "name": product.name,
                                "image": str(product.image),
                                "price": product.price,
                                "size":product.size,
                                "quantity": product.quantity,
                                "rating": product.rating,
                                "hdh": product.hdh,
                                "color": product.color,
                                "CPU": product.CPU,
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

    @action(detail=False)
    def get_product_new(self, request):
        res=[]
        try:
            products = Product.objects.all()
            categories = Category.objects.all()
            for product in products:
                if str(datetime.date.today() - datetime.timedelta(days=1)) == str(product.start_promo.strftime('%Y-%m-%d')):
                    for category in categories:
                        if product.category.category_id  == category.category_id:
                            price_after_promotion = product.price - product.promotion
                            result = {
                                "product_id": product.product_id,
                                "name": product.name,
                                "image": str(product.image),
                                "price": product.price,
                                "size":product.size,
                                "quantity": product.quantity,
                                "rating": product.rating,
                                "hdh": product.hdh,
                                "color": product.color,
                                "CPU": product.CPU,
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
                                    "hdh": product.hdh,
                                    "color": product.color,
                                    "CPU": product.CPU,
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

    # get list bill with each product and bill in one user
    # @action(detail=False)
    # def get_bill_with_product(self, request):
    #     res = []
    #     json = {}
    #     try:
    #         bills = Bill.objects.all()
    #         details = DetailOrder.objects.all()
    #         users = User.objects.all()
    #         for bill in bills:
    #             json = {
    #                 "user": bill.user.id,
    #                 "bill": [{
    #                     "bill_id": detail.bill.bill_id,
    #                     "create_date": detail.bill.create_date,
    #                     "total_price": detail.bill.total_price,
    #                     "address": detail.bill.address,
    #                     "status_product": detail.bill.status_product.status_id,
    #                     "staff": detail.bill.staff.staff_id,
    #                     "product": {
    #                         "product_id": detail.product.product_id,
    #                         "camera": detail.product.camera,
    #                         "name": detail.product.name,
    #                         "price": detail.product.price,
    #                         "image": str(detail.product.image),
    #                         "size":detail.product.size,
    #                         "quantity": detail.product.quantity,
    #                         "rating": detail.product.rating,
    #                         "hdh": detail.product.hdh,
    #                         "color": detail.product.color,
    #                         "CPU": detail.product.CPU,
    #                         "memory": detail.product.memory,
    #                         "pin": detail.product.pin,
    #                         "gurantee": detail.product.gurantee,
    #                         "promotion": detail.product.promotion,
    #                         "start_promo": detail.product.start_promo,
    #                         "end_promo": detail.product.end_promo,
    #                         }
    #                 }for detail in details if detail.bill.user.id == bill.user.id]
    #             }
    #             if json not in res:
    #                 res.append(json)
    #         return Response(res,200)
    #     except Exception as e:
    #         return Response({
    #             "Error": repr(e)
    #         }, 400)


    # get bill for user
    @action(detail=False)
    def get_bill_user(self, request):
        req_user = request.user
        res = []
        js = {}
        try:
            bills = Bill.objects.all()
            details = DetailOrder.objects.all()
            users = User.objects.all()
            for detail in details:
                if detail.bill.user.id == req_user.id:
                    js = {
                        "user": detail.bill.user.id,
                        "product": {
                            "product_id": detail.product.product_id,
                            "camera": detail.product.camera,
                            "name": detail.product.name,
                            "price": detail.product.price,
                            "image": str(detail.product.image),
                            "size":detail.product.size,
                            "quantity": detail.product.quantity,
                            "rating": detail.product.rating,
                            "hdh": detail.product.hdh,
                            "color": detail.product.color,
                            "CPU": detail.product.CPU,
                            "memory": detail.product.memory,
                            "pin": detail.product.pin,
                            "gurantee": detail.product.gurantee,
                            "promotion": detail.product.promotion,
                            "start_promo": detail.product.start_promo,
                            "end_promo": detail.product.end_promo,
                            "address": detail.bill.user.address,
                            "phone": detail.bill.user.phone,
                            "number_product_order": detail.number_product_order,
                            "rest_product": detail.product.quantity - detail.number_product_order
                        },
                        "bill": {
                            "bill_id": detail.bill.bill_id,
                            "create_date": detail.bill.create_date,
                            "total_price": detail.bill.total_price,
                            "status_product": detail.bill.status_product.status_id,
                            "staff": detail.bill.staff.staff_id,
                        }
                    }
                    res.append(js)
            return Response(res,200)
        except Exception as e:
            return Response({
                "Error": repr(e)
            }, 400)
    # get list bill with each user each object
    @action(detail=False)
    def get_bill_with_product(self, request):
        res = []
        js = {}
        try:
            bills = Bill.objects.all()
            details = DetailOrder.objects.all()
            users = User.objects.all()
            for detail in details:
                js = {
                    "user": detail.bill.user.id,
                    "product": {
                        "product_id": detail.product.product_id,
                        "camera": detail.product.camera,
                        "name": detail.product.name,
                        "price": detail.product.price,
                        "image": str(detail.product.image),
                        "size":detail.product.size,
                        "quantity": detail.product.quantity,
                        "rating": detail.product.rating,
                        "hdh": detail.product.hdh,
                        "color": detail.product.color,
                        "CPU": detail.product.CPU,
                        "memory": detail.product.memory,
                        "pin": detail.product.pin,
                        "gurantee": detail.product.gurantee,
                        "promotion": detail.product.promotion,
                        "start_promo": detail.product.start_promo,
                        "end_promo": detail.product.end_promo,
                        "address": detail.bill.user.address,
                        "phone": detail.bill.user.phone,
                        "number_product_order": detail.number_product_order,
                        "rest_product": detail.product.quantity - detail.number_product_order
                    },
                    "bill": {
                        "bill_id": detail.bill.bill_id,
                        "create_date": detail.bill.create_date,
                        "total_price": detail.bill.total_price,
                        "status_product": detail.bill.status_product.status_id,
                        "staff": detail.bill.staff.staff_id,
                    }
                }
                res.append(js)
            return Response(res,200)
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

    @action(detail=False)
    def get_comment(self, request):
        comments = Comment.objects.all()
        users = User.objects.all()
        res = []
        try:
            for comment in comments:
                res.append({
                    "comment_id": comment.comment_id,
                    "time_comment": str(comment.time_comment.strftime('%Y-%m-%d')),
                    "content": comment.content,
                    "product": comment.product.product_id,
                    "user": [{
                        "user_id": user.id,
                        "fullname": user.fullname
                    }for user in users if user.id == comment.user.id]
                })
            return Response(res, 200)
        except Exception as e:
            return Response({
                "Error": repr(e)
            }, 400)