from django.test import TestCase, Client
from user.models import User
from .models import Outfit
from item.models import Item
from tag.models import Tag
import json


class OutfitTestCase(TestCase):

    def setUp(self):
        # create user
        self.client = Client(enforce_csrf_checks=False)
        user = User.objects.create_user(username="test", email="test", password="test")

        # create Tags
        tag_black = Tag(name="black", user=user)
        tag_black.save()
        tag_white = Tag(name="white", user=user)
        tag_white.save()
        tag_red = Tag(name="red", user=user)
        tag_red.save()
        tag_fancy = Tag(name="fancy", user=user)
        tag_fancy.save()
        tag_verypretty = Tag(name="verypretty", user=user)
        tag_verypretty.save()

        # create Items
        item1 = Item(category="Outer", user=user)
        item1.save()
        item1.tags.add(tag_black, tag_white)
        item2 = Item(category="UpperBody", user=user)
        item2.save()
        item2.tags.add(tag_black, tag_red)
        item3 = Item(category="Accessories", user=user)
        item3.save()
        item3.tags.add(tag_black, tag_fancy)
        item4 = Item(category="verypretty", user=user)
        item4.save()
        item4.tags.add(tag_verypretty)

        # create Outfit
        outfit1 = Outfit(user=user, image_link="", date="2019-11-11", tempAvg=3, tempIcon="happy", satisfaction=5)
        outfit1.save()
        outfit1.items.add(item1, item2, item3, item4)
        outfit1.save()

    def test_outfit_id(self):
        self.client.login(username='test', password='test')
        response = self.client.get('/api/outfit/1/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('Outer', response.content.decode())

        # request outfit that does not exist
        response = self.client.get('/api/outfit/100/')
        self.assertEqual(response.status_code, 404)

    def test_create_outfit1(self):
        self.client.login(username='test', password='test')
        input_outfit = {
            "image": "",
            "date": "2019-11-12",
            "satisfactionValue": 4,
            "weather": {
                "tempAvg": 3,
                "icon": "happy"
            },
            "items": [{
                "category": "UpperBody",
                "tags": ["black", "red"]
            }]
        }
        self.assertEqual(Outfit.objects.all().count(), 1)
        response = self.client.post('/api/outfit/',
                                    json.dumps(input_outfit),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Outfit.objects.all().count(), 2)

    def test_create_outfit2(self):
        self.client.login(username='test', password='test')
        input_outfit = {
            "image": "",
            "date": "2019-11-12",
            "satisfactionValue": 4,
            "weather": {
                "tempAvg": 3,
                "icon": "happy"
            },
            "items": [{
                "category": "UpperBody",
                "tags": ["black", "stripe"]
            }]
        }
        self.assertEqual(Outfit.objects.all().count(), 1)
        response = self.client.post('/api/outfit/',
                                    json.dumps(input_outfit),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Outfit.objects.all().count(), 2)

    def test_create_outfit_wrong_input(self):
        self.client.login(username='test', password='test')
        # wrong key input
        input_outfit = {
        }
        response = self.client.post('/api/outfit/',
                                    json.dumps(input_outfit),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 400)

        # unallowed request
        response = self.client.delete('/api/outfit/')
        self.assertEqual(response.status_code, 405)

    def test_get_outfits(self):
        self.client.login(username='test', password='test')
        response = self.client.get('/api/outfit/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(1, len(json.loads(response.content.decode())))

    def test_delete_outfit(self):
        self.client.login(username='test', password='test')
        self.assertEqual(Outfit.objects.all().count(), 1)
        response = self.client.delete('/api/outfit/1/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(Outfit.objects.all().count(), 0)
        self.assertEqual(Item.objects.all().count(), 0)
        self.assertEqual(Tag.objects.all().count(), 0)

    def test_edit_outfit1(self):
        self.client.login(username='test', password='test')

        edited_outfit = {
            "image": "",
            "date": "2019-11-11",
            "satisfactionValue": "4",
            "weather": {
                "tempAvg": 3,
                "icon": "happy"
            },
            "items": [
                {
                    "category": "UpperBody",
                    "tags": ["black", "stripe"]
                }
            ]
        }

        self.assertEqual(Outfit.objects.get(pk=1).items.count(), 4)

        response = self.client.put('/api/outfit/1/', json.dumps(edited_outfit), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(Outfit.objects.get(pk=1).items.count(), 1)

    def test_edit_outfit2(self):
        self.client.login(username='test', password='test')

        edited_outfit = {
            "image": "",
            "date": "2019-11-11",
            "satisfactionValue": "4",
            "weather": {
                "tempAvg": 3,
                "icon": "happy"
            },
            "items": [
                {
                    "category": "UpperBody",
                    "tags": ["black", "red"]
                }
            ]
        }

        self.assertEqual(Outfit.objects.get(pk=1).items.count(), 4)

        response = self.client.put('/api/outfit/1/', json.dumps(edited_outfit), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(Outfit.objects.get(pk=1).items.count(), 1)

    def test_edit_outfit_wrong_input(self):
        self.client.login(username='test', password='test')

        edited_outfit = {}

        # wrong key input
        response = self.client.put('/api/outfit/1/', json.dumps(edited_outfit), content_type='application/json')
        self.assertEqual(response.status_code, 400)
