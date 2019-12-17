from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import ensure_csrf_cookie
from .models import Item
# Create your views here.
def getItems(request):

    user1 = request.user

    if request.method == 'GET':

        response_array = []

        for item in Item.objects.filter(user=user1).all():
            
            item_to_add = {
                "id": item.id,
                "category": item.category,
                "tags": [tag.name for tag in item.tags.all()]
            }

            response_array.append(item_to_add)

        return JsonResponse(response_array, safe=False, status=200)

    else: 
        return HttpResponseNotAllowed(['GET'])
