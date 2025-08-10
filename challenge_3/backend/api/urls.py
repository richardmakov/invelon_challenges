from django.urls import path
from . import views

# URL patterns for mapping endpoints to their corresponding views
urlpatterns = [
    path('post_user/', views.post_user, name='post_user'),
    path('get_users/', views.get_users, name='get_users'),
    path('get_preferences/', views.get_preferences, name='get_preferences'),
]