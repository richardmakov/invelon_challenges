# api/serializers.py
from rest_framework import serializers
from .models import User, Preference

class UserSerializer(serializers.ModelSerializer):
    preferences = serializers.PrimaryKeyRelatedField(
        queryset=Preference.objects.all(),
        many=True
    )

    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'preferences', 'affiliate']
