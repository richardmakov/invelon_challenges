import sys
from django.apps import AppConfig

class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

    def ready(self):
        if 'migrate' in sys.argv or 'makemigrations' in sys.argv:
            return

        from .models import Preference

        preferences = [
            'Water',
            'Coffee',
            'Soda',
            'Peach Juice',
            'Beer',
            'Wine',
            'Tea',
            'Lemonade',
            'Orange Juice',
            'Kombucha',
        ]

        for name in preferences:
            normalized_name = name.strip().lower()
            Preference.objects.get_or_create(
                name__iexact=normalized_name,
                defaults={'name': name}
            )
