from django.shortcuts import render

def frontend_app_view(request):
    return render(request, 'index.html')
