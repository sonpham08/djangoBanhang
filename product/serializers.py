from rest_framework import serializers

from .models import (Category,Product,DealedProduct,StatusProduct,
Staff, Bill, DetailOrder, Comment)

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields="__all__"

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields="__all__"

class DealedProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=DealedProduct
        fields="__all__"

class StatusProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=StatusProduct
        fields="__all__"

class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model=Staff
        fields="__all__"

class BillSerializer(serializers.ModelSerializer):
    class Meta:
        model=Bill
        fields="__all__"

class DetailOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model=DetailOrder
        fields="__all__"

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Comment
        fields="__all__"