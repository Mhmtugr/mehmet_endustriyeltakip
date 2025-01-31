from flask import request, jsonify
from flask_restful import Resource
from server.extensions import db
from server.models import InventoryItem, PurchaseOrder

class ListInventory(Resource):
    def get(self):
        inventory = InventoryItem.query.all()
        return jsonify([item.to_dict() for item in inventory])

class CreatePurchaseOrder(Resource):
    def post(self):
        data = request.get_json()
        if not data or "item_id" not in data or "order_quantity" not in data:
            return {"error": "Eksik veri"}, 400

        new_order = PurchaseOrder(
            item_id=data["item_id"],
            order_quantity=data["order_quantity"],
            expected_delivery=data.get("expected_delivery"),
            status="Pending"
        )

        db.session.add(new_order)
        db.session.commit()

        return jsonify({"message": "Satın alma siparişi oluşturuldu", "order_id": new_order.id}), 201

class UpdatePurchaseOrder(Resource):
    def put(self, po_id):
        data = request.get_json()
        order = PurchaseOrder.query.get(po_id)

        if not order:
            return {"error": "Sipariş bulunamadı"}, 404

        for key, value in data.items():
            setattr(order, key, value)

        db.session.commit()
        return jsonify({"message": "Sipariş güncellendi", "order_id": order.id})

class CreatePurchaseOrderWithMaterial(Resource):
    def post(self):
        data = request.get_json()
        material_name = data.get("material_name")
        quantity = data.get("quantity", 0)
        item = InventoryItem.query.filter_by(item_name=material_name).first()
        if not item:
            return {"error": "Item not found"}, 404

        new_po = PurchaseOrder(
            item_id=item.id,
            order_quantity=quantity,
            expected_delivery=data.get("expected_delivery"),
            status="Open"
        )
        db.session.add(new_po)
        db.session.commit()
        return {"message": "Purchase order created", "po_id": new_po.id}

class UpdatePurchaseOrderWithReceived(Resource):
    def post(self, po_id):
        po = PurchaseOrder.query.get(po_id)
        if not po:
            return {"error": "Purchase order not found"}, 404

        data = request.get_json()
        po.status = data.get("status", po.status)
        quantity_received = data.get("quantity_received", 0)

        if po.status == "Received" and quantity_received > 0:
            item = InventoryItem.query.get(po.item_id)
            item.quantity += quantity_received
            db.session.commit()

        db.session.commit()
        return {"message": "Purchase order updated", "po": po.to_dict()}
