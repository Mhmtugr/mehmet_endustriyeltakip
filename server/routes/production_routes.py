from flask import request, jsonify
from flask_restful import Resource
from server.extensions import db
from server.models import ProductionTask

class CreateProductionTask(Resource):
    def post(self):
        data = request.get_json()
        if not data or "task_name" not in data:
            return {"error": "Görev adı zorunludur"}, 400

        new_task = ProductionTask(
            task_name=data.get("task_name"),
            description=data.get("description"),
            status=data.get("status", "Pending"),
            sales_order_id=data.get("sales_order_id"),
            department=data.get("department"),
            planned_duration_days=data.get("planned_duration_days")
        )

        db.session.add(new_task)
        db.session.commit()

        return jsonify({"message": "Üretim görevi oluşturuldu", "task_id": new_task.id}), 201

class UpdateProductionTask(Resource):
    def put(self, task_id):
        data = request.get_json()
        task = ProductionTask.query.get(task_id)

        if not task:
            return {"error": "Görev bulunamadı"}, 404

        for key, value in data.items():
            setattr(task, key, value)
        
        db.session.commit()
        return jsonify({"message": "Üretim görevi güncellendi", "task_id": task.id})

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

class ListProductionTasks(Resource):
    def get(self):
        tasks = ProductionTask.query.all()
        return jsonify([task.to_dict() for task in tasks])

class DeleteProductionTask(Resource):
    def delete(self, task_id):
        task = ProductionTask.query.get(task_id)

        if not task:
            return {"error": "Görev bulunamadı"}, 404

        db.session.delete(task)
        db.session.commit()
        return jsonify({"message": "Görev silindi"})
