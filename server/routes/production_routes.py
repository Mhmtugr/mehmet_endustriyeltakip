from flask import request, jsonify
from flask_restful import Resource
from ..extensions import db
from ..models import ProductionTask

class CreateProductionTask(Resource):
    def post(self):
        data = request.get_json()
        new_task = ProductionTask(
            sales_order_id=data.get("sales_order_id"),
            department=data.get("department"),
            planned_duration_days=data.get("planned_duration_days"),
            status="Not Started"
        )
        db.session.add(new_task)
        db.session.commit()
        return jsonify({"message": "Production task created", "task_id": new_task.id})

class UpdateProductionTask(Resource):
    def post(self, task_id):
        task = ProductionTask.query.get(task_id)
        if not task:
            return {"error": "Task not found"}, 404

        data = request.get_json()
        task.status = data.get("status", task.status)
        if "actual_duration_days" in data:
            task.actual_duration_days = data["actual_duration_days"]
        db.session.commit()
        return {"message": "Task updated", "task": task.to_dict()}
