
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import (Category,Product,DealedProduct,StatusProduct,
Staff, Bill, DetailOrder, Comment, Cart, Coin, Transporter, FlashSale, FlashProduct)
from django.contrib.auth import get_user_model

from .serializers import (CategorySerializer,ProductSerializer,DealedProductSerializer,
StatusProductSerializer,StaffSerializer,BillSerializer,DetailOrderSerializer,CommentSerializer,
CartSerializer,CoinSerializer,TransporterSerializer,FlashSaleSerializer,FlashProductSerializer)
import base64
import os
import time
import moment
import calendar
import datetime
import pytz
import json
from django.core.mail import send_mail
from django.conf import settings
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

class CoinViewSet(viewsets.ModelViewSet):
    queryset = Coin.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = CoinSerializer

    @action(detail=False)
    def get_coin(self, request):
        res=[]
        try:
            coins = Coin.objects.all()
            users = User.objects.all()
            for coin in coins:
                res.append({
                    "coin_id": coin.coin_id,
                    "count": coin.count,
                    "user": [{
                        "user_id": user.id,
                        "fullname": user.fullname
                    }for user in users if user.id == coin.user.id]
                })
                    
            return Response(res, 200)
        except Exception as e:
            return Response({
                "Error": repr(e)
            }, 400)

    @action(detail=False)
    def get_coin_by_user(self, request):
        req_user = request.user
        res={}
        try:
            coins = Coin.objects.all()
            users = User.objects.all()
            for coin in coins:
                for user in users: 
                    if user.id == coin.user.id and user.id == req_user.id:
                        res = {
                            "coin_id": coin.coin_id,
                            "count": coin.count,
                            "user_id": user.id,
                            "fullname": user.fullname 
                        }
                    
            return Response(res, 200)
        except Exception as e:
            return Response({
                "Error": repr(e)
            }, 400)

class TransporterViewSet(viewsets.ModelViewSet):
    queryset = Transporter.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = TransporterSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = ProductSerializer

    @action(detail=False)
    def get_product_hightlight(self, request):
        res=[]
        try:
            products = Product.objects.all()
            categories = Category.objects.all()
            for product in products:
                if product.rating >= 3:
                    for category in categories:
                        if product.category.category_id  == category.category_id:
                            price_after_promotion = product.price - product.promotion
                            result = {
                                "product_id": product.product_id,
                                "name": product.name,
                                "image": str(product.image),
                                "price": product.price,
                                "description": product.description,
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
                                "flashsale_perform": False,
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
                            "description": product.description,
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
                            "flashsale_perform": False,
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
                                "description": product.description,
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
                                "flashsale_perform": False,
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
                                "description": product.description,
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
                                "flashsale_perform": False,
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

class FlashSaleViewSet(viewsets.ModelViewSet):
    queryset = FlashSale.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = FlashSaleSerializer

    ## only get flash sale today
    @action(detail=False)
    def get_flash_product(self, request):
        res=[]
        try:
            flashsale = FlashSale.objects.all()
            flashproduct = FlashProduct.objects.all()
            for sale in flashsale:
                # print('start', sale.start_flash.hour)
                # print('end', sale.end_flash.hour)
                if str(datetime.date.today()) == str(sale.start_flash.strftime('%Y-%m-%d')):
                    timenow = datetime.datetime.today().hour
                    res.append({
                        "flash_id": sale.flash_id,
                        "start": sale.start_flash,
                        "end": sale.end_flash,
                        "flashproduct": [{
                            "product_id": product.product.product_id,
                            "name": product.product.name,
                            "price": product.product.price,
                            "image": str(product.product.image),
                            "size":product.product.size,
                            "quantity": product.product.quantity,
                            "rating": product.product.rating,
                            "hdh": product.product.hdh,
                            "color": product.product.color,
                            "CPU": product.product.CPU,
                            "memory": product.product.memory,
                            "camera": product.product.camera,
                            "pin": product.product.pin,
                            "gurantee": product.product.gurantee,
                            "promotion": product.product.promotion,
                            "start_promo": product.product.start_promo,
                            "end_promo": product.product.end_promo,
                            "flashsale_perform": True,
                            "category": product.product.category.category_id
                        }for product in flashproduct if product.flashsale.flash_id == sale.flash_id and
                        timenow + 7 >= sale.start_flash.hour and timenow + 7 < sale.end_flash.hour]
                    })
            return Response(res, 200)
        except Exception as e:
            return Response({
                "Error": repr(e)
            }, 400)

class FlashProductViewSet(viewsets.ModelViewSet):
    queryset = FlashProduct.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = FlashProductSerializer


class DealedProductViewSet(viewsets.ModelViewSet):
    queryset = DealedProduct.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = DealedProductSerializer

    @action(detail=False)
    def statistic_basic_year(self, request):
        req_year=int(request.GET['year'])
        req_month = int(request.GET['month'])
        list_day = []
        if(req_month != 0):
            days = calendar.monthcalendar(req_year, req_month)
            for day in days:
                for d in day:
                    if d != 0:
                        list_day.append(d)
        months = [1,2,3,4,5,6,7,8,9,10,11,12] ## ngay trong 1 nam
        output = []
        results = {}
        statistics = []
        try:
            dealed = DealedProduct.objects.all()
            if req_year != 0 and req_month == 0:
                for month in months:
                    count = 0
                    for deal in dealed:
                        if deal.month == month:
                            count += 1
                    output.append(count)
                    statistics.append({
                        "month": month,
                        "year": deal.year,
                        "count": count
                    })
                results = {
                    "day": [],
                    "month": months,
                    "current": req_month,
                    "output": output,
                    "statistics": statistics
                }
            else:
                if req_year != 0 and req_month != 0:
                    for day in list_day:
                        count = 0
                        for deal in dealed:
                            
                            if deal.month == req_month and deal.day == day:
                                count += 1
                        output.append(count)
                        statistics.append({
                            "day": day,
                            "year": deal.year,
                            "count": count
                        })
                    results = {
                        "day": list_day,
                        "month": [],
                        "current": req_month,
                        "output": output,
                        "statistics": statistics
                    }

            return Response(results, 200)
        except Exception as e:
            return Response({
                "Error": repr(e)
            }, 400)

    @action(detail=False)
    def statistic_category(self, request):
        req_year=int(request.GET['year'])
        req_month = int(request.GET['month'])
        count = 0
        res = []
        total = 0
        try:
            dealed = DealedProduct.objects.all()
            categories = Category.objects.all()
            products = Product.objects.all()
            if req_year != 0 and req_month != 0:
                for category in categories:
                    count = 0
                    for deal in dealed:
                        if deal.product.category.category_id == category.category_id and deal.month == req_month:
                            count += 1
                            total += 1
                    res.append({
                        "category": category.name,
                        "count": count,
                        "month": req_month,
                        "year": deal.year
                    })

                res.append({
                    "category": "Tổng số",
                    "count": total,
                    "month": req_month,
                    "year": 2019
                })
            else:
                if req_year != 0 and req_month == 0:
                    for category in categories:
                        count = 0
                        for deal in dealed:
                            if deal.product.category.category_id == category.category_id:
                                count += 1
                                total += 1
                        res.append({
                            "category": category.name,
                            "count": count,
                            "year": deal.year
                        })

                    res.append({
                        "category": "Tổng số",
                        "count": total,
                        "year": 2019
                    })
                    
            return Response(res, 200)
        except Exception as e:
            return Response({
                "Error": repr(e)
            },400)

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
                                "num_buy": cart.num_buy,
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
                                "flashsale_perform": False,
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

    @action(detail=False)
    def get_staff(self, request):
        res=[]
        try:
            staffs = Staff.objects.all()
            transporters = Transporter.objects.all()
            for staff in staffs:
                res.append({
                    "staff_id": staff.staff_id,
                    "name": staff.name,
                    "phone": staff.phone,
                    "price": staff.price,
                    "transporter": [{
                        "transporter_id": transporter.transporter_id,
                        "name": transporter.name
                    }for transporter in transporters if transporter.transporter_id == staff.transporter.transporter_id]
                })
                    
            return Response(res, 200)
        except Exception as e:
            return Response({
                "Error": repr(e)
            }, 400)

class BillViewSet(viewsets.ModelViewSet):
    queryset = Bill.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = BillSerializer

    @action(detail=False)
    def email(self, request):
        subject = request.query_params['subject']
        email = request.query_params['email']
        message = request.query_params['message']
        try:
            email_from = settings.EMAIL_HOST_USER
            recipient_list = [email]
            send_mail( subject, message, email_from, recipient_list )
            return Response("successfully", 200)
        except Exception as e:
            return Response({
                "Error": repr(e)
            }, 400)


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