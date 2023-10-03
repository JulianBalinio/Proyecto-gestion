from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from inventario.models import Inventory

@receiver(post_save, sender=get_user_model())
def create_inventory(sender, instance, created, **kwargs):
    if created:
        Inventory.objects.create(user=instance)
