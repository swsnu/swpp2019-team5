from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import ensure_csrf_cookie

# Create your views here.
@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])

def getItem(request, item_id):
    return HttpResponse()

def getOutfitContainedItem(request, item_id):
    return HttpResponse()

def getTagsOfItem(request, item_id):
    return HttpResponse()

def getSelectedTag(request, item_id, tag_id):
    return HttpResponse()