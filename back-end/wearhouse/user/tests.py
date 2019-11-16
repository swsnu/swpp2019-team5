from django.test import TestCase, Client
from user.models import User
from .models import User
import json

# Create your tests here.

class UserTestCase(TestCase):

    def test_csrf(self):
        client = Client(enforce_csrf_checks=True)
        response = client.post('/api/user/user/', {'email': 'swpp@snu.com', 'password': 'iluvswpp'},
                               content_type='application/json')
        self.assertEqual(response.status_code, 403)  

        response = client.get('/api/user/token/')
        csrftoken = response.cookies['csrftoken'].value  

        response = client.post('/api/user/user/', json.dumps({'email': 'swpp@snu.com', 'password': 'iluvswpp'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)

    def test_User(self):
        client = Client(enforce_csrf_checks=True)

        response = client.get('/api/user/token/')
        csrftoken = response.cookies['csrftoken'].value  
        response = client.get('/api/user/logout/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)
        response = client.post('/api/user/user/', json.dumps({'email': 'swpp@snu.com', 'password': 'iluvswpp'}), 
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)
        response = client.post('/api/user/login/', json.dumps({'email': 'swpp@snu.com', 'password': 'iluvswppp'}), 
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)
        response = client.post('/api/user/login/', json.dumps({'email': 'swpp@snu.com', 'password': 'iluvswpp'}), 
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 204)
        response = client.get('/api/user/logout/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 204)    
