from django.conf import settings
from django.db import models
from django.db.models.signals import post_save

STATUSES = [
    ("Open", "Open"),
    ("In Progress", "In Progress"),
    ("Completed", "Completed"),
]


class Appointment(models.Model):
    name = models.CharField(max_length=200)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    status = models.CharField(max_length=50, choices=STATUSES)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    description = models.TextField(max_length=1000, blank=True, null=True)

    def __str__(self):
        return self.name


class AppointmentCard(models.Model):
    appointment = models.OneToOneField(Appointment, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    status = models.CharField(max_length=50, choices=STATUSES)

    def __str__(self):
        return self.name


class AppointmentFile(models.Model):
    appointment = models.ForeignKey(Appointment, on_delete=models.CASCADE)
    file = models.FileField(upload_to=settings.MEDIA_ROOT)
