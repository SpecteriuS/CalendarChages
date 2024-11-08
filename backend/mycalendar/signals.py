from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Appointment, AppointmentCard


@receiver(post_save, sender=Appointment)
def create_appointment_card(sender, instance, created, **kwargs):
    if created:
        AppointmentCard.objects.create(
            appointment=instance,
            name=instance.name,
            start_date=instance.start_date,
            end_date=instance.end_date,
            status=instance.status,
        )


@receiver(post_save, sender=Appointment)
def save_appointment_card(sender, instance, **kwargs):
    instance.save()
