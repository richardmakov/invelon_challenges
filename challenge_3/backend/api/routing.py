from django.urls import re_path
from . import consumers

# WebSocket URL patterns for real-time communication
websocket_urlpatterns = [
    re_path(r'ws/hora/$', consumers.ClockConsumer.as_asgi()),
]
