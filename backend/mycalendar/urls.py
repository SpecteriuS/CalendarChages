from rest_framework.routers import DefaultRouter

from .views import *


router = DefaultRouter()
router.register("appointment", AppointmentViewset, basename="appointment")
urlpatterns = router.urls
