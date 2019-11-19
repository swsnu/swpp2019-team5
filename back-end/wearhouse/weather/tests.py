from django.test import TestCase, Client
from django.http import HttpResponsePermanentRedirect
import json


class WeatherTestCase(TestCase):
    def test_getWeather(self):
        client = Client()
        response = client.get("/api/weather", follow=True)
        self.assertEqual(response.status_code, 200)

    def test_getSepcWeather(self):
        client = Client()
        response = client.get("/api/weather/"+str(1573570800), follow=True)
        self.assertEqual(response.status_code, 200)
