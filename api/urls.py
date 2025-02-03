# api/urls.py
from django.urls import path
from .views import PhotoUploadView

urlpatterns = [
    path('photos/', PhotoUploadView.as_view(), name='photo-list'),
]