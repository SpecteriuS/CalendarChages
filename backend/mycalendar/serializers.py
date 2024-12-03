from rest_framework import serializers

from .models import Direction, Project, Appointment, AppointmentCard


class AppointmentSerializer(serializers.ModelSerializer):

    title = serializers.CharField(source="name")
    start = serializers.DateTimeField(source="start_date")
    end = serializers.DateTimeField(source="end_date")
    classNames = serializers.CharField(source="status")
    contacts = serializers.PrimaryKeyRelatedField(
        source="contact", many=True, read_only=True
    )
    contact_name = serializers.StringRelatedField(source="contact", many=True)

    class Meta:
        model = Appointment
        fields = [
            "id",
            "project",
            "title",
            "start",
            "end",
            "classNames",
            "description",
            "contacts",
            "contact_name",
        ]


class AppointmentCardSerializer(serializers.ModelSerializer):

    title = serializers.CharField(source="name")
    start = serializers.DateTimeField(source="start_date")
    end = serializers.DateTimeField(source="end_date")
    classNames = serializers.CharField(source="status")

    class Meta:
        model = AppointmentCard
        fields = [
            "id",
            "title",
            "start",
            "end",
            "classNames",
        ]


class ProjectSerializer(serializers.ModelSerializer):
    appointments = AppointmentSerializer(
        source="appointment_set", many=True, read_only=True
    )

    class Meta:
        model = Project
        fields = ["id", "direction", "name", "slug", "description", "appointments"]


class DirectionSerializer(serializers.ModelSerializer):
    projects = ProjectSerializer(source="project_set", many=True, read_only=True)

    class Meta:
        model = Direction
        fields = ["id", "name", "slug", "description", "projects"]
