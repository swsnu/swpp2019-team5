from django.shortcuts import render
from django.http import JsonResponse
import time
import requests

# Create your views here.

latitude = 37.459882
longditude = 126.9497166
time = str(int(time.time())) # Get Unix time of the call
DARK_API_KEY = "25c0e19a13544467a927d2bf945d828a"

def getWeather(request):
    response = requests.get("https://api.darksky.net/forecast/25c0e19a13544467a927d2bf945d828a/37.459882,126.9497166,"+time+"?exclude=[currently,minutely,hourly,alerts,flags]&units=si")
    weatherData = response.json()
    abridgedWeather = {
		"summary": weatherData['daily']['data'][0]['summary'],
		"icon": weatherData['daily']['data'][0]['icon'],
		"temperatureHigh": weatherData['daily']['data'][0]['temperatureHigh'],
		"temperatureLow": weatherData['daily']['data'][0]['temperatureLow']
	}
    print(abridgedWeather)
    return JsonResponse(abridgedWeather,safe=False)