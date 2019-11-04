from django.test import TestCase, Client
from django.contrib.auth.models import User
from .models import Outfit
import json
# Create your tests here.

def get_csrf_token(client):
    response = client.get('/api/token/')
    csrftoken = response.cookies['csrftoken'].value
    return csrftoken
