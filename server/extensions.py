from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_restful import Api

db = SQLAlchemy()
api = Api()

def init_extensions(app):
    db.init_app(app)
    CORS(app)
    api.init_app(app)
