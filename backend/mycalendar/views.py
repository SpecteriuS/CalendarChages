from rest_framework import viewsets, permissions, status
from rest_framework.response import Response

from .serializers import *
from .models import *


class AppointmentViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def list(self, request):
        queryset = Appointment.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = self.queryset.get(pk=pk)
        serializer = self.serializer_class(queryset)
        return Response(serializer.data)
    
    def put(self, request, pk=None):
        queryset = self.queryset.get(pk=pk)
        serializer = self.serializer_class(queryset, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
   
        return Response(serializer.errors, status=400)
    
    def delete(self, request, pk=None):
        queryset = self.queryset.get(pk=pk)
        queryset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class AppointmentCardViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = AppointmentCard.objects.all()
    serializer_class = AppointmentCardSerializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def list(self, request):
        queryset = AppointmentCard.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = self.queryset.get(pk=pk)
        serializer = self.serializer_class(queryset)
        return Response(serializer.data)
