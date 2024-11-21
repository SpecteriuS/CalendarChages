from django.contrib import admin

from .models import Direction, Project, Appointment, AppointmentCard, AppointmentFile


class DirectionAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "name",
        "slug",
        "description",
    ]
    prepopulated_fields = {"slug": ("name",)}


class ProjectAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "direction",
        "name",
        "slug",
        "description",
    ]
    prepopulated_fields = {"slug": ("name",)}


class AppointmentAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "project",
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


admin.site.register(Direction, DirectionAdmin)
admin.site.register(Project, ProjectAdmin)
admin.site.register(Appointment, AppointmentAdmin)
admin.site.register(AppointmentCard, AppointmentCardAdmin)
admin.site.register(AppointmentFile, AppointmentFileAdmin)
