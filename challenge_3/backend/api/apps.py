from django.apps import AppConfig
import sys

class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

    def ready(self):
        # Evitar correr durante migraciones
        if 'migrate' in sys.argv or 'makemigrations' in sys.argv:
            return

        from .models import Preference

        preferences = ['Water','Coffee','Soda','Peach Juice','Beer','Wine','Tea','Lemonade','Orange Juice','Kombucha']


        for pref in preferences:
            normalized_name = pref.strip().lower()
            existing = Preference.objects.filter(name__iexact=normalized_name).first()
            if not existing:
                Preference.objects.create(name=normalized_name)
