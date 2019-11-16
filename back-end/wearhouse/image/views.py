from django.http import HttpResponse


# Create your views here.
def getImage(request):
    print(request.data)

