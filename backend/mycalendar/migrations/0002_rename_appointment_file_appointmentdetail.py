# Generated by Django 5.1.2 on 2024-11-07 23:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mycalendar', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='file',
            old_name='Appointment',
            new_name='appointmentdetail',
        ),
    ]
