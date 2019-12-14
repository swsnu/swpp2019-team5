"""
WSGI config for wearhouse project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

<<<<<<< HEAD
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'wearhouse.settings.production')
=======
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'wearhouse.settings.development')
>>>>>>> 4eedeb08567f42de768c450574f0207e2d3345bb

application = get_wsgi_application()
