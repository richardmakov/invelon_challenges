import sys
from django.apps import AppConfig

# Django application configuration for the api app
class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

    def ready(self):
        # Skip execution if running migration commands
        if 'migrate' in sys.argv or 'makemigrations' in sys.argv:
            return

        from .models import Preference

        # List of predefined preferences to insert into the database
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

        # Insert preferences if they do not already exist
        for name in preferences:
            normalized_name = name.strip().lower()
            Preference.objects.get_or_create(
                name__iexact=normalized_name,
                defaults={'name': name}
            )
