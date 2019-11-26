from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import ensure_csrf_cookie
# Create your views here.


def getTag(request):
    return HttpResponse(status=404)


def getItemHavingTag(reqeust, outfit_id):
    return HttpResponse(status=404)
