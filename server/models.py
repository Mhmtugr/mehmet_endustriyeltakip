# server/models.py
from datetime import datetime
from server.extensions import db

class SalesOrder(db.Model):
    __tablename__ = 'sales_orders'
    id = db.Column(db.Integer, primary_key=True)
    customer_name = db.Column(db.String(150), nullable=False)
    product_type = db.Column(db.String(50), nullable=False)
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

class InventoryItem(db.Model):
    __tablename__ = 'inventory_items'
    id = db.Column(db.Integer, primary_key=True)
    material_name = db.Column(db.String(150), unique=True, nullable=False)
    current_stock = db.Column(db.Integer, default=0)
    min_stock_level = db.Column(db.Integer, default=0)
    lead_time_days = db.Column(db.Integer, default=0)

    def to_dict(self):
        return {
            "id": self.id,
            "material_name": self.material_name,
            "current_stock": self.current_stock,
            "min_stock_level": self.min_stock_level,
            "lead_time_days": self.lead_time_days,
        }

class PurchaseOrder(db.Model):
    __tablename__ = 'purchase_orders'
    id = db.Column(db.Integer, primary_key=True)
    item_id = db.Column(db.Integer, db.ForeignKey('inventory_items.id'))
    quantity_ordered = db.Column(db.Integer, nullable=False)
    estimated_arrival_days = db.Column(db.Integer, nullable=True)
    status = db.Column(db.String(50), default="Open")

    def to_dict(self):
        return {
            "id": self.id,
            "item_id": self.item_id,
            "quantity_ordered": self.quantity_ordered,
            "estimated_arrival_days": self.estimated_arrival_days,
            "status": self.status
        }

# Uygulamanızın yapay zeka servisi için gerekli veriler;
# (Eski versiyondaki alanlar; böylece AIServices içindeki kodlarınız çalışmaya devam eder)
class AIModelTrainingData(db.Model):
    __tablename__ = 'ai_model_training_data'
    id = db.Column(db.Integer, primary_key=True)
    product_type = db.Column(db.String(50), nullable=False)
    complexity_factor = db.Column(db.Float, nullable=False)
    total_material_count = db.Column(db.Integer, nullable=False)
    actual_delivery_days = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "product_type": self.product_type,
            "complexity_factor": self.complexity_factor,
            "total_material_count": self.total_material_count,
            "actual_delivery_days": self.actual_delivery_days,
            "created_at": self.created_at.isoformat()
        }

class ProductionTask(db.Model):
    __tablename__ = 'production_tasks'
    id = db.Column(db.Integer, primary_key=True)
    task_name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(50), default="Pending")
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    def to_dict(self):
        return {
            "id": self.id,
            "task_name": self.task_name,
            "description": self.description,
            "status": self.status,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
