from django.db import models
from userauth.models import Profile

STATUSES = [
    ("Open", "Open"),
    ("In Progress", "In Progress"),
    ("Completed", "Completed"),
]


class Direction(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField(max_length=500, blank=True, null=True)

    def __str__(self):
        return self.name


class Project(models.Model):
    direction = models.ForeignKey(Direction, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField(max_length=500, blank=True, null=True)

    def __str__(self):
        return self.name


class Appointment(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    status = models.CharField(max_length=50, choices=STATUSES)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    description = models.TextField(max_length=1000, blank=True, null=True)
    contact = models.ManyToManyField(Profile)

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


def file_upload_name(instance, filename):
    return "/".join([instance.appointment.name, filename])


class AppointmentFile(models.Model):
    appointment = models.ForeignKey(Appointment, on_delete=models.CASCADE)
    file = models.FileField(upload_to=file_upload_name)
