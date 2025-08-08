# api/apps.py
from django.apps import AppConfig

class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

    def ready(self):
        from .models import Preference
        preferences = ['water', 'coffee', 'soda', 'peach_juice', 'beer', 'wine', 'tea', 'lemonade', 'orange_juice', 'kombucha']
        for pref in preferences:
            Preference.objects.get_or_create(name=pref)
