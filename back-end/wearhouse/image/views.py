from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import Algorithmia
from azure.storage.blob import BlockBlobService, PublicAccess
from shutil import copyfileobj
from tempfile import NamedTemporaryFile

ACCOUNT_NAME = 'swppteam5'
ACCOUNT_KEY = 'INNEsiLTptw/5kiagJGhIZkv5fmHvEStvN5ALrggYjRvIme68H6YrN6ZEanMkJbYRj5XTcbjvmVLOdgZqXrKZg=='
CONTAINER_NAME = 'image'
ML_API_KEY = 'simn+b1WVna/jczp8z4CxaUUq7F1'
ML_MODEL_NAME = 'algorithmiahq/DeepFashion/1.3.0'


def initBlobStorageService():
    block_blob_service = BlockBlobService(
        account_name=ACCOUNT_NAME,
        account_key=ACCOUNT_KEY
    )

    return block_blob_service


def createBlobStorageContainer(block_blob_service, container_name):
    block_blob_service.create_container(container_name)
    # Set the permission of the blobs to be public
    block_blob_service.set_container_acl(container_name, public_access=PublicAccess.Container)


def storeImageInBlobContainer(block_blob_service, input_file):
    try:
        with NamedTemporaryFile() as target:
            copyfileobj(input_file, target)
            target.flush()
            print(target.name)

            blob_name = "test"
            block_blob_service.create_blob_from_path(CONTAINER_NAME, blob_name, target.name)

            image_url = block_blob_service.make_blob_url(CONTAINER_NAME, blob_name)
            print(image_url)
            return image_url

    except Exception as error:
        print(error)


def runML(image_url):
    image_input = {
        "image": image_url,
        "model": "small",
        "tags_only": True
    }

    client = Algorithmia.client(ML_API_KEY)
    algo = client.algo(ML_MODEL_NAME)
    algo.set_options(timeout=300)

    try:
        result = algo.pipe(image_input).result
        return result

    except Exception as error:
        print(error)
        return {"articles": []}


def categorize(article):
    '''
    :param article:
       {
      "article_name": "button down shirt",
      "bounding_box": {
        "x0": 431,
        "x1": 905,
        "y0": 267,
        "y1": 702
      },
      "confidence": 0.9515272378921508
        }
    :return:
        {
            "category": "upperbody",
            "tags": ["button", "down", "shirt"]
        }
    '''
    outer = ["lightweight jacket", "winter jacket", "overall", "denim jacket", "leather jacket", "trenchcoat"]
    upper = ["t shirt", "sweater", "tank top", "button down shirt", "blouse", "vest", "blazer", "tunic", "sweatshirt"]
    lower = ["jeans", "skirt", "leggings", "pants casual", "sweatpants", "shorts", "hosiery", "socks"]
    full = ["lingerie", "casual dress", "formal dress", "rompers", "pants suit formal", "jumpsuit", "sweater dress",
            "underwear"]
    shoes = ["boots", "sandals", "heels pumps or wedges", "sneakers", "flats", "running shoes"]
    accessories = ["top handle bag", "jewelry", "sunglasses", "watches", "hat", "shoulder bag", "glasses", "clutches",
                   "backpack or messenger bag", "belts", "headwrap", "gloves"]

    # print(len(outer) + len(upper) + len(lower) + len(full) + len(shoes) + len(accessories))

    mapping = {'Outer': outer, 'UpperBody': upper, 'LowerBody': lower, 'FullBody': full, 'Shoes': shoes, 'Accessories': accessories}

    item_dict = {}

    for key, value in mapping.items():
        target = article['article_name']
        if target in value:
            item_dict = {"category": key, "tags": target.split(" ")}

    return item_dict


@csrf_exempt
def getImage(request):
    if request.method == 'POST':

        block_blob_service = initBlobStorageService()
        # createBlobStorageContainer(block_blob_service, CONTAINER_NAME)

        # get binary file
        input_file = request.FILES['image'].file

        image_url = storeImageInBlobContainer(block_blob_service, input_file)

        result = runML(image_url)["articles"]  # type of result: python dict

        print(result)

        categorized_result = map(categorize, result)

        response_dict = {"image": image_url, "items": list(categorized_result)}
        print(response_dict)

        return JsonResponse(response_dict, status=201)

    else:
        return JsonResponse(status=405)


