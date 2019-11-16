from abc import ABC
from storages.backends.azure_storage import AzureStorage


class AzureMediaStorage(AzureStorage, ABC):
    account_name = 'swppdiag128'
    account_key = '+s4gQjcveBLRPQDEtwzsGLvMh+nyKP+odrqDAhonF/67Rl61VTmQINjjMJ/u0EbWGGVkQieZgl/NTMg5lBJFHg=='
    azure_container = 'media'
    expiration_secs = None


class AzureStaticStorage(AzureStorage, ABC):
    account_name = 'swppdiag128'
    account_key = '+s4gQjcveBLRPQDEtwzsGLvMh+nyKP+odrqDAhonF/67Rl61VTmQINjjMJ/u0EbWGGVkQieZgl/NTMg5lBJFHg=='
    azure_container = 'static'
    expiration_secs = None
