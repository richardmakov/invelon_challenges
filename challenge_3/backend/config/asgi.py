"""
ASGI config for config project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/asgi/
"""

import os
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.core.asgi import get_asgi_application
import api.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

# Get the standard Django ASGI application for handling HTTP requests
django_asgi_app = get_asgi_application()

# Define the ASGI application with support for both HTTP and WebSocket protocols
application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": AuthMiddlewareStack(
        URLRouter(
            api.routing.websocket_urlpatterns
        )
    ),
})
