from django.urls import reverse
from .test_setup import InventarioSetup

class InventarioTest(InventarioSetup):
    def test_get(self):
        url = reverse("inventario:productos-list")
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 3)

    