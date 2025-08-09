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
        
        if len(name) > 20:
            return JsonResponse({'error': 'Name cannot be longer than 20 characters'}, status=400)
        if len(email) > 30:
            return JsonResponse({'error': 'Email cannot be longer than 30 characters'}, status=400)

        if User.objects.filter(name=name).exists():
                return JsonResponse({'error': 'User duplicated! Name already in use'}, status=400)
        if User.objects.filter(email=email).exists():
                return JsonResponse({'error': 'User duplicated! Email already in use'}, status=400)
        
        if len(preferences_ids) != len(set(preferences_ids)):
            return JsonResponse({'error': 'Duplicate preferences'}, status=400)

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
            'preferences': [pref.name for pref in user.preferences.all()]
        }, status=201)

@csrf_exempt
def get_users(request):
    if request.method == 'GET':
        users = User.objects.all()
        users_list = []
        for user in users:
            users_list.append({
                'id': user.id,
                'name': user.name,
                'email': user.email,
                'preferences': [pref.name for pref in user.preferences.all()],
                'affiliate': user.affiliate
            })
        return JsonResponse(users_list, safe=False)
    
@csrf_exempt
def get_preferences(request):
    if request.method == 'GET':
        preferences = Preference.objects.all()
        preferences_list = []
        for pref in preferences:
            image_url = ''
            if pref.image:
                image_url = request.build_absolute_uri(pref.image.url)
            
            preferences_list.append({
                'id': pref.id,
                'name': pref.name.replace('_', ' ').capitalize(),
            })
        return JsonResponse(preferences_list, safe=False)
