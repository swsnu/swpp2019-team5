from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import ensure_csrf_cookie
from django.shortcuts import get_object_or_404
from .models import Outfit
from tag.models import Tag
from item.models import Item
from user.models import User
from django.forms.models import model_to_dict
from json import JSONDecodeError
import json
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.db import transaction


# Create your views here.
@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])


@csrf_exempt
@require_http_methods(['GET', 'POST'])
@transaction.atomic
def outfit(request):
    user1 = User(email="sungyeonoo@naver.com", password="1111")
    user1.save()
    if request.method == 'GET':
        outfits_all_list = [outfit for outfit in Outfit.objects.all()]
        return JsonResponse(outfits_all_list, safe=False)
    elif request.method == 'POST':
        try:
            body = request.body.decode()
            image = json.loads(body)["image"]
            date = json.loads(body)["date"]
            satisfaction = json.loads(body)["satisfactionValue"]
            tempIcon = json.loads(body)["weather"].icon
            tempAvg = json.loads(body)["weather"].tempAvg

            items = json.loads(body)["items"]
            items_for_new_outfit = []
            for item in items:
                tags_per_item = []
                itemExists = True
                item_candidates = []
                i = 0
                for tag_name in item["tags"]:  # tags=["black", "white", "2019"]
                    try:
                        tag = Tag.objects.get(name=tag_name)
                        tags_per_item.append(tag)
                        if itemExists:
                            if i is 0:
                                item_candidates = [
                                    item for item in tag.items_with_this_tag]
                                i = 1
                            else:
                                for item_candidate in item_candidates:
                                    itemExists = tag in item_candidate.tags
                                    if not itemExists:
                                        item_candidates.remove(item_candidate)
                            # 지금 보고있는 tag의 itmes들을 가져온다
                            # 이전에 저장되어 있던 item_candidate와의 교집합을 찾는다 (?)
                            # 교집한 없으면 itemExists 에 false를 넣는다
                    except Tag.DoesNotExist:
                        # check user
                        itemExists = False
                        new_tag = Tag(name=tag_name, user=user1)
                        new_tag.save()
                        tags_per_item.append(new_tag)
                # tag 없는 애는 생성, 있는애는 객체로 받아서 받아서 tags안에 다 들어있음
                # itemExits 이미 존재하는 item이 잇는지 확인 끝

                if itemExists:
                    item_candidates = filter(lambda x: x.category == item["category"] and len(x.tags) == len(item["tags"]),
                                             item_candidates)
                    assert len(
                        item_candidates) <= 1, "...it is literally disaster"
                    if len(item_candidates) == 1:
                        items_for_new_outfit.append(item_candidates[0])

                else:
                    new_item = Item(category=item["category"],
                                    tags=tags_per_item, user=user1)  # check user
                    new_item.save()
                    items_for_new_outfit.append(new_item)
                    # true -> itemCandidates 안에 list item id.
                    # category가 같은 애들 먼저 filter
                    # finally tags length equality check -> itemExtist true? 바로 그 item을 get해와서 item 배열에 넣고 : false면 새로 item생성해서 배열에 넣고

            new_outfit = Outfit(
                image=image, date=date, satisfaction=satisfaction, tempIcon=tempIcon, tempAvg=tempAvg)
            new_outfit.save()

            for item in items_for_new_outfit:
                new_outfit.items.add(item)
            new_outfit.save()

            response_dict_weather = {
                "tempAvg": new_outfit.tempAvg, "icon": new_outfit.tempIcon}
            response_dict_items = []
            for item in new_outfit.items:
                item_to_add = {
                    "id": item.id,
                    "category": item.category,
                    "tags": [tag.name for tag in item.tags]
                }
                response_dict_items.append(item_to_add)

            response_dict = {
                "id": new_outfit.id,
                "image": new_outfit.image,
                "date": new_outfit.date,
                "satisfactionValue": new_outfit.satisfaction,
                "weather": response_dict_weather,
                "items": response_dict_items}
            print(response_dict)
            # return HttpResponse(response_dict, status=201)

        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()

        return JsonResponse(model_to_dict(outfit), status=201)
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])


def getOutfit(reqeust, outfit_id):
    if reqeust.method == 'GET':
        outfit = Outfit.objects.get(pk=outfit_id)

    return JsonResponse(model_to_dict(outfit), status=00)


def getItemsOfOutfit(request, outfit_id):
    return HttpResponse(status=404)


def getSpecificItemOfOutfit(request, outfit_id, item_id):
    return HttpResponse(status=404)
