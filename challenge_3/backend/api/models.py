# api/models.py
from django.db import models

# Model Preference (name)
class Preference(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

# Model User (name, email, preferences, affiliate)
class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    preferences = models.ManyToManyField(Preference, related_name='users')
    affiliate = models.BooleanField(default=False)

    def __str__(self):
        return self.name
