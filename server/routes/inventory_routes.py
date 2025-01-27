from flask import request, jsonify
from flask_restful import Resource
from ..extensions import db
from ..models import InventoryItem, PurchaseOrder

class ListInventory(Resource):
    def get(self):
        items = InventoryItem.query.all()
        return jsonify([i.to_dict() for i in items])

class CreatePurchaseOrder(Resource):
    def post(self):
        data = request.get_json()
        material_name = data.get("material_name")
        quantity = data.get("quantity", 0)
        item = InventoryItem.query.filter_by(material_name=material_name).first()
        if not item:
            return {"error": "Item not found"}, 404

        new_po = PurchaseOrder(
            item_id=item.id,
            quantity_ordered=quantity,
            estimated_arrival_days=item.lead_time_days,
            status="Open"
        )
        db.session.add(new_po)
        db.session.commit()
        return {"message": "Purchase order created", "po_id": new_po.id}

class UpdatePurchaseOrder(Resource):
    def post(self, po_id):
        po = PurchaseOrder.query.get(po_id)
        if not po:
            return {"error": "Purchase order not found"}, 404

        data = request.get_json()
        po.status = data.get("status", po.status)
        quantity_received = data.get("quantity_received", 0)

        if po.status == "Received" and quantity_received > 0:
            item = InventoryItem.query.get(po.item_id)
            item.current_stock += quantity_received
            db.session.commit()

        db.session.commit()
        return {"message": "Purchase order updated", "po": po.to_dict()}
