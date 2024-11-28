from django.contrib import admin
from .models import User, Profile


class UserAdmin(admin.ModelAdmin):
    list_display = ["username", "password"]

class ProfileAdmin(admin.ModelAdmin):
    list_display = ["full_name", "username", "email", "phone" ]


admin.site.register(User, UserAdmin)
admin.site.register(Profile, ProfileAdmin)