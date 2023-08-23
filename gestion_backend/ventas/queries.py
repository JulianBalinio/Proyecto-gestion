from decimal import Decimal


def apply_item_discount(order_items):

    total_price = Decimal(0)

    for item in order_items:
        product = item['product']
        quantity = item['quantity']
        discount = item.get('discount', Decimal(0))

        item_price = product.price - (product.price * discount / Decimal(100))
        item_total = item_price * quantity
        total_price += item_total

    return total_price


def apply_global_discount(total_price, discount_percent):
    """
    Aplica un descuento global al monto total de la compra.
    Parámetros:
    - total_price (decimal): Monto total de la compra.
    - discount_percent (decimal): Porcentaje de descuento global a aplicar.
    Retorna:
    - Monto total con el descuento aplicado.
    """
    discount_amount = total_price * (discount_percent / 100)
    discounted_total_price = total_price - discount_amount
    return discounted_total_price
