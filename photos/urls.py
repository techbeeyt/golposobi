from django.urls import path
from .views import photo_list, upload_photo

urlpatterns = [
    path('', photo_list, name='photo_list'),
    path('upload/', upload_photo, name='upload_photo'),
]