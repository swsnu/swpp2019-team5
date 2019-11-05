from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth import authenticate, login, logout
from json import JSONDecodeError
from .models import User
import json
# Create your views here.

@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])


def signin(request):
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            email = req_data['email']
            password = req_data['password']
        except (KeyError, JSONDecodeError):
            return HttpResponse(status = 400)    
        user = authenticate(request, username = email, email = email, password = password)
        if user is not None:
            login(request, user)
            return HttpResponse(status = 204)
        else: 
            return HttpResponse(status = 401)
    else: 
        return HttpResponseNotAllowed(['POST'])

def signout(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            logout(request)
            return HttpResponse(status = 204)
        else:
            return HttpResponse(status = 401)
    else:
        return HttpResponseNotAllowed(['GET'])

def createUser(request):
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            email = req_data['email']
            password = req_data['password']
        except (KeyError, JSONDecodeError):
            return HttpResponse(status = 400)    
        User.objects.create_user(username = email, email = email ,password = password)
        return HttpResponse(status=201)
    else:
        return HttpResponseNotAllowed(['POST'])