from rest_framework.routers import DefaultRouter

from .views import *


router = DefaultRouter()
router.register("profile", ProfileViewset, basename="profile")
urlpatterns = router.urls
