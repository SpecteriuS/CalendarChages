from django.contrib import admin

from .models import Appointment, AppointmentCard, AppointmentFile


class AppointmentAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "name",
        "start_date",
        "end_date",
        "description",
        "status",
        "created",
        "modified",
    ]


class AppointmentCardAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "appointment",
        "name",
        "start_date",
        "end_date",
        "status",
    ]


class AppointmentFileAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "appointment",
        "file",
    ]


admin.site.register(Appointment, AppointmentAdmin)
admin.site.register(AppointmentCard, AppointmentCardAdmin)
admin.site.register(AppointmentFile, AppointmentFileAdmin)
