from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import ensure_csrf_cookie
from django.shortcuts import get_object_or_404
from .models import Outfit
from django.forms.models import model_to_dict
from json import JSONDecodeError
import json


# Create your views here.
@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])

def outfit(request):
    if request.method == 'GET':
        outfits_all_list = [outfit for outfit in Outfit.objects.all()]
        return JsonResponse(outfits_all_list, safe=False)
    elif request.method == 'POST':
        try:
            body = request.body.decode()
            #TODO : ADD ITEM BY ML API
            
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()
        outfit = Outfit()
        outfit.save()
        return JsonResponse(model_to_dict(outfit) ,status = 201)
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])

def getOutfit(reqeust, outfit_id):
    if reqeust.method == 'GET':
        outfit = Outfit.objects.get(pk = outfit_id)
     
    return JsonResponse(model_to_dict(outfit), status = 00)


def getItemsOfOutfit(request, outfit_id):
    return HttpResponse()

def getSpecificItemOfOutfit(request, outfit_id, item_id):
    return HttpResponse()
