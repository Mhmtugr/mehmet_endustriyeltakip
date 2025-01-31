from flask_restful import Api
from .sales_routes import (
    CreateSalesOrder, ListSalesOrders, SalesOrderDetail, UpdateSalesOrder, DeleteSalesOrder
)
from .production_routes import (
    CreateProductionTask, UpdateProductionTask, ListProductionTasks, DeleteProductionTask
)
from .inventory_routes import (
    ListInventory, CreatePurchaseOrder, UpdatePurchaseOrder
)
from .ai_routes import (
    TrainModelResource, PredictDeliveryResource
)
from .reports_routes import ProductionDashboard

def register_routes(api: Api):
    """ Flask RESTful API için tüm endpointleri ekler """

    # SALES
    api.add_resource(CreateSalesOrder, "/orders")
    api.add_resource(ListSalesOrders, "/orders/list")
    api.add_resource(SalesOrderDetail, "/orders/<int:order_id>")
    api.add_resource(UpdateSalesOrder, "/orders/update/<int:order_id>")
    api.add_resource(DeleteSalesOrder, "/orders/delete/<int:order_id>")

    # PRODUCTION
    api.add_resource(CreateProductionTask, "/production")
    api.add_resource(UpdateProductionTask, "/production/update/<int:task_id>")
    api.add_resource(ListProductionTasks, "/production/list")
    api.add_resource(DeleteProductionTask, "/production/delete/<int:task_id>")

    # INVENTORY
    api.add_resource(ListInventory, "/inventory")
    api.add_resource(CreatePurchaseOrder, "/purchase_orders")
    api.add_resource(UpdatePurchaseOrder, "/purchase_orders/<int:po_id>")

    # AI
    api.add_resource(TrainModelResource, "/ai/train")
    api.add_resource(PredictDeliveryResource, "/ai/predict")

    # REPORTS
    api.add_resource(ProductionDashboard, "/reports/dashboard")
