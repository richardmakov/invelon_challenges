import os
from django.core.files import File
from django.apps import AppConfig

class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

    def ready(self):
        import sys
        if 'migrate' in sys.argv or 'makemigrations' in sys.argv:
            return

        from .models import Preference

        preferences = [
            ('Water', 'water.jpg'),
            ('Coffee', 'coffee.jpg'),
            ('Soda', 'soda.jpg'),
            ('Peach Juice', 'peach_juice.jpg'),
            ('Beer', 'beer.jpg'),
            ('Wine', 'wine.jpg'),
            ('Tea', 'tea.jpg'),
            ('Lemonade', 'lemonade.jpg'),
            ('Orange Juice', 'orange_juice.jpg'),
            ('Kombucha', 'kombucha.jpg'),
        ]


        base_dir = os.path.dirname(os.path.abspath(__file__))
        images_dir = os.path.join(base_dir, 'seed_images')

        for name, filename in preferences:
            normalized_name = name.strip().lower()
            pref, created = Preference.objects.get_or_create(name__iexact=normalized_name, defaults={'name': name})

            if created:
                image_path = os.path.join(images_dir, filename)
                if os.path.exists(image_path):
                    with open(image_path, 'rb') as f:
                        pref.image.save(filename, File(f), save=True)
                else:
                    print(f'Imagen no encontrada para {name}: {image_path}')
