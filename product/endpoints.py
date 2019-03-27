
from django.urls import include, path
# from rest_framework import routers
from djangodkdt.routers import SharedAPIRootRouter

from .api import (CategoryViewSet,ProductViewSet,DealedProductViewSet,
StatusProductViewSet,StaffViewSet, BillViewSet, DetailOrderViewSet,CommentViewSet)

router = SharedAPIRootRouter()
router.register('category', CategoryViewSet)
router.register('product', ProductViewSet)
router.register('dealedproduct', DealedProductViewSet)
router.register('statusproduct', StatusProductViewSet)
router.register('staff', StaffViewSet)
router.register('bill', BillViewSet)
router.register('detail', DetailOrderViewSet)
router.register('comment', CommentViewSet)