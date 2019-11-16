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
    return HttpResponse(status=404)

def getOutfitContainedItem(request, item_id):
    return HttpResponse(status=404)

def getTagsOfItem(request, item_id):
    return HttpResponse(status=404)

def getSelectedTag(request, item_id, tag_id):
    return HttpResponse(status=404)
