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
import copy

#user1 = User.objects.get(username="test")

'''
    :param  YYYY-MM-DD-Time
    :return YYYY-MM-DD
'''


def change_date_format(date):
    return date[0:10]


@csrf_exempt
@require_http_methods(['GET', 'POST'])
@transaction.atomic
def outfit(request):
    user1 = request.user

    if request.method == 'GET':

        response_array = []

        for _outfit in Outfit.objects.filter(user=user1).all():
            weather_dict = {
                "tempAvg": _outfit.tempAvg,
                "icon": _outfit.tempIcon
            }

            items_array = []
            for item in _outfit.items.all():
                item_to_add = {
                    "id": item.id,
                    "category": item.category,
                    "tags": [tag.name for tag in item.tags.all()]
                }
                items_array.append(item_to_add)

            outfit_dict = {
                "id": _outfit.id,
                "image": _outfit.image_link,
                "date": _outfit.date,
                "satisfactionValue": _outfit.satisfaction,
                "weather": weather_dict,
                "items": items_array
            }

            response_array.append(outfit_dict)
        return JsonResponse(response_array, safe=False, status=200)

    elif request.method == 'POST':
        try:
            body = request.body.decode()
            request_dict = json.loads(body)

            date = request_dict["date"]
            satisfaction = request_dict["satisfactionValue"]
            tempIcon = request_dict["weather"]["icon"]
            tempAvg = request_dict["weather"]["tempAvg"]
            image = request_dict["image"]
            items = request_dict["items"]

            items_for_new_outfit = []
            for item in items:
                tags_per_item = []
                itemExists = True
                item_candidates = []
                i = 0
                print("tag names array from front: ")
                print(item["tags"])
                for tag_name in item["tags"]:  # tags=["black", "white", "2019"]
                    try:
                        print("current tag name: ")
                        print(tag_name)
                        tag = Tag.objects.get(name=tag_name)
                        tags_per_item.append(tag)

                        if itemExists:
                            if i is 0:
                                item_candidates = [item for item in tag.items_with_this_tag.all()]
                                print("item_candidates first print: ")
                                print(item_candidates)
                                i = 1

                            else:
                                item_candidates_read = copy.deepcopy(item_candidates)
                                for item_candidate in item_candidates_read:
                                    print("item_candidate, tag: ")
                                    print(item_candidate, tag.name)
                                    itemExists = tag in item_candidate.tags.all()

                                    print("itemExists_in item candidate: ")
                                    print(itemExists)

                                    print(tag.name + ": ")
                                    print(item_candidates)
                                    if not itemExists:
                                        item_candidates.remove(item_candidate)
                                        print(tag.name + "(after remove): ")
                                        print(item_candidates)
                            # 지금 보고있는 tag의 itmes들을 가져온다
                            # 이전에 저장되어 있던 item_candidate와의 교집합을 찾는다 (?)
                            # 교집한 없으면 itemExists 에 false를 넣는다
                    except Tag.DoesNotExist:
                        # check user
                        print("Inside New Tag")
                        itemExists = False
                        item_candidates = []
                        new_tag = Tag(name=tag_name, user=user1)
                        new_tag.save()
                        print("New Tag: ")
                        print(new_tag.name)
                        tags_per_item.append(new_tag)
                # tag 없는 애는 생성, 있는애는 객체로 받아서 받아서 tags안에 다 들어있음
                # itemExits 이미 존재하는 item이 잇는지 확인 끝
                item_candidates = filter(lambda x: x.category == item["category"] and x.tags.all().count() == len(item["tags"]),
                                             item_candidates)
                item_candidates = list(item_candidates) # convert filter object to list
                print("item_candidates: ")
                print(item_candidates)
                assert len(item_candidates) <= 1, "...it is literally disaster"

                itemExists = len(item_candidates) == 1

                if itemExists:
                    assert len(item_candidates) == 1, "...inside itemExists"
                    items_for_new_outfit.append(item_candidates[0])
                    print("items_for_new_outfit: ")
                    print(items_for_new_outfit)

                else:
                    new_item = Item(category=item["category"], user=user1)  # check user
                    new_item.save()
                    for tag in tags_per_item:
                        new_item.tags.add(tag)
                    new_item.save()
                    items_for_new_outfit.append(new_item)
                    # true -> itemCandidates 안에 list item id.
                    # category가 같은 애들 먼저 filter
                    # finally tags length equality check -> itemExtist true? 바로 그 item을 get해와서 item 배열에 넣고 : false면 새로 item생성해서 배열에 넣고

                print("itemExists_received: ")
                print(itemExists)

            new_outfit = Outfit(
                image_link=image, date=change_date_format(date), satisfaction=satisfaction, tempIcon=tempIcon, tempAvg=tempAvg, user=user1)
            new_outfit.save()

            print("items_for_new_outfit: right before saving outfit: ")
            print(items_for_new_outfit)
            for item in items_for_new_outfit:
                new_outfit.items.add(item)
            new_outfit.save()

            response_dict_weather = {
                "tempAvg": new_outfit.tempAvg, "icon": new_outfit.tempIcon}
            response_dict_items = []
            for item in new_outfit.items.all():
                item_to_add = {
                    "id": item.id,
                    "category": item.category,
                    "tags": [tag.name for tag in item.tags.all()]
                }
                response_dict_items.append(item_to_add)

            response_dict = {
                "id": new_outfit.id,
                "image": new_outfit.image_link,
                "date": new_outfit.date,
                "satisfactionValue": new_outfit.satisfaction,
                "weather": response_dict_weather,
                "items": response_dict_items}
            print(response_dict)

            return JsonResponse(response_dict, status=201)

        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()

    else:
        return HttpResponseNotAllowed(['GET', 'POST'])


def getOutfit(request, outfit_id):
    if request.method == 'GET':
        outfit = Outfit.objects.get(pk=outfit_id)

        response_dict_weather = {
            "tempAvg": outfit.tempAvg, "icon": outfit.tempIcon
        }
        response_dict_items = []
        for item in outfit.items.all():
            item_to_add = {
                "id": item.id,
                "category": item.category,
                "tags": [tag.name for tag in item.tags.all()]
            }
            response_dict_items.append(item_to_add)

        response_dict = {
            "id": outfit.id,
            "image": outfit.image_link,
            "date": outfit.date,
            "satisfactionValue": outfit.satisfaction,
            "weather": response_dict_weather,
            "items": response_dict_items
        }

        return JsonResponse(response_dict, status=200)

