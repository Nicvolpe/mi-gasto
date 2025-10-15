from django.conf import settings
from django.db import models

class Expense(models.Model):
    CATEGORIES = [
        ('food','Comida'),('transport','Transporte'),('bills','Servicios'),
        ('leisure','Ocio'),('other','Otros')
    ]
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    category = models.CharField(max_length=20, choices=CATEGORIES)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    currency = models.CharField(max_length=3, default='ARS')  # 'ARS','USD','EUR'
    date = models.DateField()
    note = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date','-id']
