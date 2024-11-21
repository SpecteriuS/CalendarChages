from rest_framework.routers import DefaultRouter

from .views import *


router = DefaultRouter()
router.register("direction", DirectionViewset, basename="direction")
router.register("project", ProjectViewset, basename="project")
router.register("appointment", AppointmentViewset, basename="appointment")
router.register("appointment_card", AppointmentCardViewset, basename="appointment_card")
urlpatterns = router.urls
