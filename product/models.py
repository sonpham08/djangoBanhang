from django.db import models
from django.contrib.auth import get_user_model
# from user.models import User
User = get_user_model()

# Create your models here.
class Category(models.Model):
    category_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Product(models.Model):
    product_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to="images/")
    price = models.IntegerField()
    quantity = models.IntegerField(default=0)
    rating = models.IntegerField(default=0)
    size = models.CharField(max_length=255)
    hdh = models.CharField(max_length=255)
    color = models.CharField(max_length=255)
    CPU = models.CharField(max_length=255)
    memory = models.CharField(max_length=255)
    camera = models.CharField(max_length=255)
    pin = models.CharField(max_length=255)
    gurantee = models.CharField(max_length=255)
    promotion = models.IntegerField()
    start_promo = models.DateTimeField()
    end_promo = models.DateTimeField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __unicode__(self):
        return u"%s..." % self.myfield

class Cart(models.Model):
    cart_id = models.AutoField(primary_key=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=0)

class StatusProduct(models.Model):
    status_id = models.AutoField(primary_key=True)
    status = models.CharField(max_length=255)

    def __str__(self):
        return self.status

class Staff(models.Model):
    staff_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=12)

    def __str__(self):
        return self.name


class Bill(models.Model):
    bill_id = models.AutoField(primary_key=True)
    create_date = models.DateTimeField(auto_now_add=True, blank=True)
    total_price = models.IntegerField()
    address = models.CharField(max_length=255)
    status = models.CharField(max_length=255) # ghi chú
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=0)
    status_product = models.ForeignKey(StatusProduct, on_delete=models.CASCADE, default=1)
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE)

class DealedProduct(models.Model): # chi tiết đơn đặt hàng
    dealed_id = models.AutoField(primary_key=True)
    number_product_dealed = models.IntegerField() # so luong san pham da ban cho 1 san pham
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

class DetailOrder(models.Model):
    detail_id = models.AutoField(primary_key=True)
    number_product_order = models.IntegerField() ## so luong mỗi sản phẩm trong hóa đơn
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    bill = models.ForeignKey(Bill, on_delete=models.CASCADE, default=0)

class Comment(models.Model):
    comment_id = models.AutoField(primary_key=True)
    customer_comment_name = models.CharField(max_length=25)
    time_comment = models.DateTimeField()
    content = models.CharField(max_length=255)
    customer_comment_phone = models.CharField(max_length=25)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)