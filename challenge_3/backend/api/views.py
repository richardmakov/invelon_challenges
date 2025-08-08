# api/views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import User, Preference

@csrf_exempt
def post_user(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        name = data['name']
        email = data['email']
        affiliate = data['affiliate']
        preferences_ids = data['preferences']
        
        if User.objects.filter(name=name).exists():
                return JsonResponse({'error': 'User duplicated! Name already in use'}, status=400)
        if User.objects.filter(email=email).exists():
                return JsonResponse({'error': 'User duplicated! Email already in use'}, status=400)
        
        if len(preferences_ids) != len(set(preferences_ids)):
            return JsonResponse({'error': 'Duplicate preferences'}, status=400)
        print(preferences_ids[0])
        has_even = any(pref_id % 2 == 0 for pref_id in preferences_ids)
        has_odd = any(pref_id % 2 != 0 for pref_id in preferences_ids)

        if not (has_even and has_odd):
            return JsonResponse({
                'error': 'Invalid preferences'
            }, status=400)
        
        user = User.objects.create(name=name, email=email, affiliate=affiliate)
        preferences = Preference.objects.filter(id__in=preferences_ids)
        user.preferences.set(preferences)
        user.save()

        return JsonResponse({
            'id': user.id,
            'name': user.name,
            'email': user.email,
            'affiliate': user.affiliate,
            'preferences': [pref.name for pref in preferences]
        }, status=201)

@csrf_exempt
def get_users(request):
    if request.method == 'GET':
        users = User.objects.all()
        users_list = []
        for user in users:
            users_list.append({
                'name': user.name,
                'email': user.email,
                'preferences': [pref.name for pref in user.preferences.all()],
                'affiliate': user.affiliate
            })
        return JsonResponse(users_list, safe=False)
