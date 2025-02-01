# server/routes/sales_routes.py
from flask import request, jsonify
from flask_restful import Resource, fields, marshal
from server.extensions import db
from server.models import SalesOrder
from server.services.ai_service import AIServices

order_fields = {
    "id": fields.Integer,
    "customer_name": fields.String,
    "product_type": fields.String,
    "koruma_rolesi": fields.String,
    "calisma_gerilimi": fields.Float,
    "nominal_akim": fields.Float,
    "kontrol_gerilimi": fields.Float,
    "akim_trafo": fields.String,
    "gerilim_trafo": fields.String,
    "status": fields.String,
    "estimated_delivery_days": fields.Integer,
    "created_at": fields.String
}

class CreateSalesOrder(Resource):
    def post(self):
        data = request.get_json()

        required_fields = ["customer_name", "product_type"]
        for field in required_fields:
            if not data.get(field):
                return {"error": f"{field} zorunludur"}, 400

        new_order = SalesOrder(
            customer_name=data.get("customer_name"),
            product_type=data.get("product_type"),
            koruma_rolesi=data.get("koruma_rolesi"),
            calisma_gerilimi=data.get("calisma_gerilimi"),
            nominal_akim=data.get("nominal_akim"),
            kontrol_gerilimi=data.get("kontrol_gerilimi"),
            akim_trafo=data.get("akim_trafo"),
            gerilim_trafo=data.get("gerilim_trafo"),
            status="New"
        )
        db.session.add(new_order)
        db.session.commit()

        # AI tahmini (Opsiyonel)
        complexity_factor = 1.0
        if "ABB" in (data.get("koruma_rolesi") or ""):
            complexity_factor += 0.1

        material_map = {"CB": 15, "LB": 10, "FL": 12, "RMU": 20}
        total_material_count = material_map.get(data.get("product_type"), 10)

        predicted_days = AIServices.predict_delivery_days(
            data.get("product_type"),
            complexity_factor,
            total_material_count
        )
        if predicted_days is not None:
            new_order.estimated_delivery_days = predicted_days
            db.session.commit()

        return marshal(new_order, order_fields), 201

class ListSalesOrders(Resource):
    def get(self):
        orders = SalesOrder.query.all()
        return jsonify([marshal(o, order_fields) for o in orders])

class SalesOrderDetail(Resource):
    def get(self, order_id):
        order = SalesOrder.query.get(order_id)
        if not order:
            return {"error": "Sipariş bulunamadı"}, 404
        return marshal(order, order_fields)

class UpdateSalesOrder(Resource):
    def put(self, order_id):
        data = request.get_json()
        order = SalesOrder.query.get(order_id)
        if not order:
            return {"error": "Sipariş bulunamadı"}, 404
        for key, value in data.items():
            setattr(order, key, value)
        db.session.commit()
        return jsonify({"message": "Sipariş güncellendi.", "order_id": order.id})

class DeleteSalesOrder(Resource):
    def delete(self, order_id):
        order = SalesOrder.query.get(order_id)
        if not order:
            return {"error": "Sipariş bulunamadı"}, 404
        db.session.delete(order)
        db.session.commit()
        return jsonify({"message": "Sipariş silindi"})
