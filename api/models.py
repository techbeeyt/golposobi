# api/models.py
from django.db import models

class Photo(models.Model):
    image = models.ImageField(upload_to='photos/')
    description = models.TextField()
    
    def __str__(self):
        return self.description
    



    