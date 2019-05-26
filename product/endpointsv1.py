
from django.urls import include, path
from rest_framework import routers
from djangodkdt.routers import SharedAPIRootRouter

from .api import (CategoryViewSet,ProductViewSet,DealedProductViewSet,
StatusProductViewSet,StaffViewSet, BillViewSet, DetailOrderViewSet,CommentViewSet,CartViewSet,
FlashSaleViewSet, CoinViewSet, TransporterViewSet, FlashProductViewSet)



# router = SharedAPIRootRouter()
router = routers.DefaultRouter()
router.register('category', CategoryViewSet)
router.register('product', ProductViewSet)
router.register('dealedproduct', DealedProductViewSet)
router.register('statusproduct', StatusProductViewSet)
router.register('staff', StaffViewSet)
router.register('bill', BillViewSet)
router.register('detail', DetailOrderViewSet)
router.register('comment', CommentViewSet)
router.register('cart', CartViewSet),
router.register('coin', CoinViewSet),
router.register('transporter', TransporterViewSet),
router.register('flashsale', FlashSaleViewSet),
router.register('flashproduct', FlashProductViewSet),

urlpatterns = [
    path("", include(router.urls)),
]