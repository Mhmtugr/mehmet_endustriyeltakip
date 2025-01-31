from datetime import datetime
from server.extensions import db  # MUTLAK IMPORT

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

class ProductionTask(db.Model):
    __tablename__ = 'production_tasks'
    id = db.Column(db.Integer, primary_key=True)
    sales_order_id = db.Column(db.Integer, db.ForeignKey('sales_orders.id'))
    department = db.Column(db.String(50))
    planned_duration_days = db.Column(db.Integer)
    actual_duration_days = db.Column(db.Integer, nullable=True)
    status = db.Column(db.String(50), default="Not Started")

class InventoryItem(db.Model):
    __tablename__ = 'inventory_items'
    id = db.Column(db.Integer, primary_key=True)
    material_name = db.Column(db.String(150), unique=True)
    current_stock = db.Column(db.Integer)
    min_stock_level = db.Column(db.Integer)
    lead_time_days = db.Column(db.Integer)

class PurchaseOrder(db.Model):
    __tablename__ = 'purchase_orders'
    id = db.Column(db.Integer, primary_key=True)
    item_id = db.Column(db.Integer, db.ForeignKey('inventory_items.id'))
    quantity_ordered = db.Column(db.Integer)
    estimated_arrival_days = db.Column(db.Integer)
    status = db.Column(db.String(50), default="Open")

# **Hata Verdiği İçin DÜZELTİLEN MODEL**
class AIModelTrainingData(db.Model):
    __tablename__ = 'ai_model_training_data'
    id = db.Column(db.Integer, primary_key=True)
    product_type = db.Column(db.String(50))
    complexity_factor = db.Column(db.Float)
    total_material_count = db.Column(db.Integer)
    actual_delivery_days = db.Column(db.Integer)
