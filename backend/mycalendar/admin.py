from django.contrib import admin

from .models import Appointment


class AppointmentAdmin(admin.ModelAdmin):
    list_display = ["name", "start_date", "end_date", "status", "created", "modified"]


admin.site.register(Appointment, AppointmentAdmin)
