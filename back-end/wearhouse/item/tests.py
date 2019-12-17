from django.test import TestCase, Client
from user.models import User
from outfit.models import Outfit
from .models import Item
from tag.models import Tag
import json
# Create your tests here.

class ItemTestCase(TestCase):

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

    def test_get_items(self):
        self.client.login(username='test', password='test')
        response = self.client.get('/api/item/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(4, len(json.loads(response.content.decode())))
        response = self.client.post('/api/item/')
        self.assertEqual(response.status_code, 405)
