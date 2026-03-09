const shipmentData = {
    "reference_code": `REF_TEST_${Date.now()}`,
    "original_reference_code": "REF_TEST_20251709019996",
    "order_date": "2026-02-27 10:04:00",
    "reverse_pickup": false,
    "payment_mode": "COD",
    "shipment_type": "FORWARD",
    "multi_select": false,
    "is_tnb": false,
    "slotted_sla": {
        "delivery_slot_from": "2026-01-29 10:04:00",
        "delivery_slot_to": "2026-01-29 19:05:00"
    },
    "delivery_details": {
        "name": "Avik",
        "contact_num": "9140151251",
        "address_line_1": "U7,U Block Gurugram",
        "address_line_2": "Gurugram",
        "city": "Gurugram",
        "state": "Haryana",
        "country": "India",
        "latitude": 28.4940959,
        "longitude": 77.0927495,
        "email": "mohitnandan81825@gmail.com",
        "pin_code": "122008"
    },
    "return_details": {
        "name": "Darsktore captain Diljeet",
        "contact_num": "9532385430",
        "address_line_1": "okhla ",
        "address_line_2": "Delhi",
        "city": "Delhi",
        "state": "Delhi",
        "country": "India",
        "latitude": 28.4940959,
        "longitude": 77.0927495,
        "email": "mohitnandan81825@gmail.com",
        "pin_code": "110002"
    },
    "pickup_details": {
        "name": "Gandhinagar Warehouse",
        "contact_num": "9532385430",
        "address_line_1": "Warehouse 44, GIDC",
        "address_line_2": "Sector 28",
        "city": "Gandhinagar",
        "state": "Gujarat",
        "country": "India",
        "latitude": 28.4940959,
        "longitude": 77.0927495,
        "email": "pickup.gn@example.com",
        "pin_code": "122002"
    },
    "cod_details": {
        "is_cod": false,
        "collectable_amount": 10,
        "total_value": 5,
        "dynamic_adjustment_required": false,
        "miscellaneous_charges": {
            "handling_fee": 0,
            "packing_cost": 0,
            "priority_fee": 0
        }
    },
    "package_weight": 700,
    "package_length": 40,
    "package_width": 28,
    "package_height": 20,
    "order_items": [
        {
            "item_quantity": 2,
            "selling_price": 100,
            "sku": "SKU_TEST_2026_001",
            "product_name": "Herbal Green Tea Pack",
            "description": "Refreshing herbal green tea blend",
            "mrp": 199,
            "ean": "EAN2026000001",
            "category": "Beverages",
            "is_returnable": false,
            "image": "https://images.pexels.com/photos/25811351/pexels-photo-25811351.jpeg",
            "meta": {
                "flavor": "herbal",
                "weight": "150g",
                "origin": "India",
                "packaging": "paper box"
            }
        }
    ]
};

module.exports = shipmentData;