from django.test import TestCase, Client
from user.models import User
from .models import User
import json

# Create your tests here.


class UserTestCase(TestCase):
    def setUp(self):
        User.objects.create_user(
            username="test@test.com", email="test@test.com", password="testpassword")

    def test_csrf(self):
        # Check signup failure without CSRF
        client = Client(enforce_csrf_checks=True)
        response = client.post('/api/user/', {'email': 'swpp@snu.com', 'password': 'iluvswpp'},
                               content_type='application/json')
        self.assertEqual(response.status_code, 403)

        # Get request to token
        response = client.get('/api/user/token/')
        csrftoken = response.cookies['csrftoken'].value

        # SignUp works with valid token
        response = client.post('/api/user/', json.dumps({'email': 'swpp@snu.com', 'password': 'iluvswpp'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)

        # Method Not allowed / not authorized response for non-get request to token
        response = client.post('/api/user/token/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

    def test_model(self):
        content = User.objects.get(username="test@test.com").__str__()
        self.assertEqual(content, 'test@test.com')

    def signIn(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/user/token/')
        csrftoken = response.cookies['csrftoken'].value

        response = client.post('/api/user/login/', json.dumps({'email': 'test@test.com', 'password': 'testpassword'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        # for future use
        csrftoken = response.cookies['csrftoken'].value
        sessionid = response.cookies['sessionid'].value
        return [client, csrftoken, sessionid]

    def test_signin(self):

        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/user/token/')
        csrftoken = response.cookies['csrftoken'].value

        # Bad request
        response = client.post('/api/user/login/', json.dumps({'password': 'test@test.com', 'password': 'testpassword'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        # Check for nonexistent user
        response = client.post('/api/user/login/', json.dumps({'email': 'swpp@snu.com', 'password': 'iluvswppp'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)

        # Check for Nonallowed methods
        response = client.get('/api/user/login/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

        # response = client.get('/api/user/logout/', HTTP_X_CSRFTOKEN=csrftoken)
        # self.assertEqual(response.status_code, 204)

    def test_signout(self):
        credentials = self.signIn()
        client = credentials[0]
        csrftoken = credentials[1]
        sessionid = credentials[2]

        # Check Logout
        response = client.get('/api/user/logout/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 204)

        # Can't logout when not loggedin
        response = client.get('/api/user/logout/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)

        # Method not allowed for non-get requests
        response = client.delete(
            '/api/user/logout/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

    def test_user(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/user/token/')
        csrftoken = response.cookies['csrftoken'].value

        # Bad request format
        response = client.post('/api/user/', json.dumps({'password': 'swpp@snu.com', 'password': 'iluvswpp'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)

        # Signup works properly
        response = client.post('/api/user/', json.dumps({'email': 'swpp@snu.com', 'password': 'iluvswpp'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)

        # Get value of isLoggedIn
        response = client.get('/api/user/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 200)
        credentials = self.signIn()
        client = credentials[0]
        csrftoken = credentials[1]
        sessionid = credentials[2]
        response = client.get('/api/user/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 200)

        # Nonallowed method
        response = client.put('/api/user/', json.dumps({'email': 'swpp@snu.com', 'password': 'iluvswpp'}),
                              content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)
