from flask import request, jsonify
from flask_restful import Resource
from server.extensions import db
from server.models import SalesOrder
from server.services.ai_service import AIServices

class CreateSalesOrder(Resource):
    def post(self):
        data = request.get_json()

        if not data:
            return {"error": "Eksik veri"}, 400

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

        # AI tahmini (opsiyonel)
        complexity_factor = 1.0
        if "ABB" in (data.get("koruma_rolesi") or ""):
            complexity_factor += 0.1

        mat_map = {"CB": 15, "LB": 10, "FL": 12, "RMU": 20}
        total_material_count = mat_map.get(data.get("product_type"), 10)

        predicted_days = AIServices.predict_delivery_days(
            data.get("product_type"),
            complexity_factor,
            total_material_count
        )
        if predicted_days is not None:
            new_order.estimated_delivery_days = predicted_days
            db.session.commit()

        return jsonify({"message": "Sipariş başarıyla oluşturuldu.", "order_id": new_order.id}), 201

class ListSalesOrders(Resource):
    def get(self):
        orders = SalesOrder.query.all()
        return jsonify([o.to_dict() for o in orders])

class SalesOrderDetail(Resource):
    def get(self, order_id):
        order = SalesOrder.query.get(order_id)
        if not order:
            return {"error": "Order not found"}, 404
        return jsonify(order.to_dict())
