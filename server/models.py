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

class AIModelTrainingData(db.Model):
    __tablename__ = 'ai_model_training_data'
    id = db.Column(db.Integer, primary_key=True)
    model_name = db.Column(db.String(100), nullable=False)
    training_data = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "model_name": self.model_name,
            "training_data": self.training_data,
            "created_at": self.created_at.isoformat()
        }

class ProductionTask(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    task_name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(50), default="Pending")  # "Pending", "In Progress", "Completed"
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    def to_dict(self):
        return {
            "id": self.id,
            "task_name": self.task_name,
            "description": self.description,
            "status": self.status,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }

class InventoryItem(db.Model):
    __tablename__ = 'inventory_items'
    id = db.Column(db.Integer, primary_key=True)
    item_name = db.Column(db.String(255), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=0)
    unit_price = db.Column(db.Float, nullable=False, default=0.0)
    supplier = db.Column(db.String(255), nullable=True)
    last_updated = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "item_name": self.item_name,
            "quantity": self.quantity,
            "unit_price": self.unit_price,
            "supplier": self.supplier,
            "last_updated": self.last_updated.isoformat(),
        }

class PurchaseOrder(db.Model):
    __tablename__ = 'purchase_orders'
    id = db.Column(db.Integer, primary_key=True)
    item_id = db.Column(db.Integer, db.ForeignKey('inventory_items.id'), nullable=False)
    order_quantity = db.Column(db.Integer, nullable=False)
    order_date = db.Column(db.DateTime, default=datetime.utcnow)
    expected_delivery = db.Column(db.DateTime, nullable=True)
    status = db.Column(db.String(50), default="Pending")  # "Pending", "Completed", "Cancelled"

    item = db.relationship("InventoryItem", backref="purchase_orders")

    def to_dict(self):
        return {
            "id": self.id,
            "item_id": self.item_id,
            "item_name": self.item.item_name,
            "order_quantity": self.order_quantity,
            "order_date": self.order_date.isoformat(),
            "expected_delivery": self.expected_delivery.isoformat() if self.expected_delivery else None,
            "status": self.status,
        }
