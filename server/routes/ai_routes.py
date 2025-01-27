from flask import request, jsonify
from flask_restful import Resource
from ..services.ai_service import AIServices

class TrainModelResource(Resource):
    def post(self):
        msg = AIServices.train_model()
        return {"message": msg}, 200

class PredictDeliveryResource(Resource):
    def post(self):
        data = request.get_json()
        product_type = data.get("product_type")
        complexity_factor = float(data.get("complexity_factor", 1.0))
        total_material_count = int(data.get("total_material_count", 10))

        prediction = AIServices.predict_delivery_days(product_type, complexity_factor, total_material_count)
        if prediction is None:
            return {"error": "Model not trained or insufficient data."}, 400
        return {"predicted_days": prediction}, 200
