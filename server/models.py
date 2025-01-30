from datetime import datetime
from extensions import db

class SalesOrder(db.Model):
    __tablename__ = 'sales_orders'
    id = db.Column(db.Integer, primary_key=True)
    customer_name = db.Column(db.String(150))
    product_type = db.Column(db.String(50))
    koruma_rolesi = db.Column(db.String(100))
    calisma_gerilimi = db.Column(db.Float)
    nominal_akim = db.Column(db.Float)
    kontrol_gerilimi = db.Column(db.Float)
    akim_trafo = db.Column(db.String(100))
    gerilim_trafo = db.Column(db.String(100))
    status = db.Column(db.String(50), default="New")
    estimated_delivery_days = db.Column(db.Integer, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "customer_name": self.customer_name,
            "product_type": self.product_type,
            "koruma_rolesi": self.koruma_rolesi,
            "calisma_gerilimi": self.calisma_gerilimi,
            "nominal_akim": self.nominal_akim,
            "kontrol_gerilimi": self.kontrol_gerilimi,
            "akim_trafo": self.akim_trafo,
            "gerilim_trafo": self.gerilim_trafo,
            "status": self.status,
            "estimated_delivery_days": self.estimated_delivery_days,
            "created_at": self.created_at.isoformat()
        }

class ProductionTask(db.Model):
    __tablename__ = 'production_tasks'
    id = db.Column(db.Integer, primary_key=True)
    sales_order_id = db.Column(db.Integer, db.ForeignKey('sales_orders.id'))
    department = db.Column(db.String(50))
    planned_duration_days = db.Column(db.Integer)
    actual_duration_days = db.Column(db.Integer, nullable=True)
    status = db.Column(db.String(50), default="Not Started")

    def to_dict(self):
        return {
            "id": self.id,
            "sales_order_id": self.sales_order_id,
            "department": self.department,
            "planned_duration_days": self.planned_duration_days,
            "actual_duration_days": self.actual_duration_days,
            "status": self.status
        }

class InventoryItem(db.Model):
    __tablename__ = 'inventory_items'
    id = db.Column(db.Integer, primary_key=True)
    material_name = db.Column(db.String(150), unique=True)
    current_stock = db.Column(db.Integer)
    min_stock_level = db.Column(db.Integer)
    lead_time_days = db.Column(db.Integer)

    def to_dict(self):
        return {
            "id": self.id,
            "material_name": self.material_name,
            "current_stock": self.current_stock,
            "min_stock_level": self.min_stock_level,
            "lead_time_days": self.lead_time_days
        }

class PurchaseOrder(db.Model):
    __tablename__ = 'purchase_orders'
    id = db.Column(db.Integer, primary_key=True)
    item_id = db.Column(db.Integer, db.ForeignKey('inventory_items.id'))
    quantity_ordered = db.Column(db.Integer)
    estimated_arrival_days = db.Column(db.Integer)
    status = db.Column(db.String(50), default="Open")

    def to_dict(self):
        return {
            "id": self.id,
            "item_id": self.item_id,
            "quantity_ordered": self.quantity_ordered,
            "estimated_arrival_days": self.estimated_arrival_days,
            "status": self.status
        }

class AIModelTrainingData(db.Model):
    __tablename__ = 'ai_model_training_data'
    id = db.Column(db.Integer, primary_key=True)
    product_type = db.Column(db.String(50))
    complexity_factor = db.Column(db.Float)
    total_material_count = db.Column(db.Integer)
    actual_delivery_days = db.Column(db.Integer)
