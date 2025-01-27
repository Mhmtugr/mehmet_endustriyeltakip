from flask_restful import Resource
from ..models import SalesOrder, ProductionTask

class ProductionDashboard(Resource):
    def get(self):
        total_orders = SalesOrder.query.count()
        completed_orders = SalesOrder.query.filter_by(status="Completed").count()
        in_production_orders = SalesOrder.query.filter_by(status="InProduction").count()

        tasks = ProductionTask.query.all()
        delayed_count = 0
        for t in tasks:
            if t.actual_duration_days and t.actual_duration_days > t.planned_duration_days:
                delayed_count += 1

        return {
            "total_orders": total_orders,
            "completed_orders": completed_orders,
            "in_production_orders": in_production_orders,
            "delayed_tasks_count": delayed_count
        }
