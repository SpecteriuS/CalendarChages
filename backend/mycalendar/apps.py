from django.apps import AppConfig


class MycalendarConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "mycalendar"

    def ready(self):
        import mycalendar.signals
