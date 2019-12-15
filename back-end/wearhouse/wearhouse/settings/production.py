from .base import *

DEBUG = True


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'OPTIONS': {
            'read_default_file': "././mysql.cnf",
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'"
        }
    }
}