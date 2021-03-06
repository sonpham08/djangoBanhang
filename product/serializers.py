from rest_framework import serializers

from .models import (Category,Product,DealedProduct,StatusProduct,
Staff, Bill, DetailOrder, Comment,Cart,Coin,Transporter,FlashSale, FlashProduct)

from django.core.files.base import ContentFile
import base64
import six
import uuid
import imghdr


class Base64ImageField(serializers.ImageField):

    def to_internal_value(self, data):

        # Check if this is a base64 string
        if isinstance(data, six.string_types):
            # Check if the base64 string is in the "data:" format
            if 'data:' in data and ';base64,' in data:
            	# Break out the header from the base64 content
            	header, data = data.split(';base64,')

            # Try to decode the file. Return validation error if it fails.
            try:
            	decoded_file = base64.b64decode(data)
            except TypeError:
            	self.fail('invalid_image')

            # Generate file name:
            file_name = str(uuid.uuid4())[:12] # 12 characters are more than enough.
            # Get the file name extension:
            file_extension = self.get_file_extension(file_name, decoded_file)

            complete_file_name = "%s.%s" % (file_name, file_extension, )

            data = ContentFile(decoded_file, name=complete_file_name)

        return super(Base64ImageField, self).to_internal_value(data)

    def get_file_extension(self, file_name, decoded_file):

    	extension = imghdr.what(file_name, decoded_file)
    	extension = "jpg" if extension == "jpeg" else extension

    	return extension

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields="__all__"

class CoinSerializer(serializers.ModelSerializer):
    class Meta:
        model=Coin
        fields="__all__"

class TransporterSerializer(serializers.ModelSerializer):
    class Meta:
        model=Transporter
        fields="__all__"

class ProductSerializer(serializers.ModelSerializer):
    image = Base64ImageField(max_length=None, use_url=True)
    class Meta:
        model=Product
        fields=('product_id',"camera","quantity", "color","end_promo","gurantee","memory","name","pin","price","promotion"
        ,"size","hdh","start_promo","CPU", "image","category", "rating", "description")

class FlashSaleSerializer(serializers.ModelSerializer):
    class Meta:
        model=FlashSale
        fields="__all__"

class FlashProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=FlashProduct
        fields="__all__"

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model=Cart
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