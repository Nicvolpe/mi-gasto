import requests
from django.core.cache import cache

BASE_URL = 'https://api.exchangerate.host/latest'

def get_rates(base='USD'):
    key = f"rates:{base}"
    data = cache.get(key)
    if not data:
        resp = requests.get(BASE_URL, params={'base': base})
        resp.raise_for_status()
        data = resp.json()
        cache.set(key, data, 60*10)  # 10 minutos
    return data
