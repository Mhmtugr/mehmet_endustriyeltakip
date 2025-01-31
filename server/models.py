from datetime import datetime
from server.extensions import db  # 🚀 Eksik import EKLENDİ! 🚀

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
