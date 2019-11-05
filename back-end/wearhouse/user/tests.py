from django.test import TestCase, Client
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import User
import json

# Create your tests here.
# class UserTestCase(TestCase):
#     def test_csrf(self):
#         # By default, csrf checks are disabled in test client
#         # To test csrf protection we enforce csrf checks here
#         client = Client(enforce_csrf_checks=True)
#         response = client.post('user/login/', json.dumps({'email': 'swpp@snu.com', 'password': 'iluvswpp'}),
#                                content_type='application/json')
#         self.assertEqual(response.status_code, 403)  # Request without csrf token returns 403 response

#         response = client.get('token/')
#         csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie

#         response = client.post('user/', json.dumps({'email': 'swpp@snu.com', 'password': 'iluvswpp'}),
#                                content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
#         self.assertEqual(response.status_code, 201)  # Pass csrf protection
    
#     def test_User(self):
#         client = Client(enforce_csrf_checks=True)

#         response = client.get('token/')
#         csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie
#         response = client.get('user/logout/', HTTP_X_CSRFTOKEN=csrftoken)
#         self.assertEqual(response.status_code, 401)
#         response = client.post('user/login/', json.dumps({'email': 'swpp@snu.com', 'password': 'iluvswpp'}), 
#                                content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
#         self.assertEqual(response.status_code, 201)
#         response = client.post('user/login/', json.dumps({'email': 'swpp@snu.com', 'password': 'iluvswpp'}), 
#                                content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
#         self.assertEqual(response.status_code, 401)
#         response = client.post('user/login/', json.dumps({'email': 'swpp@snu.com', 'password': 'iluvswpp'}), 
#                                content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
#         self.assertEqual(response.status_code, 204)
#         csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie
#         response = client.get('/user/logout/', HTTP_X_CSRFTOKEN=csrftoken)
#         self.assertEqual(response.status_code, 204)    
