import sys
import os

# Modül yollarını ayarla
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from config import Config
from flask import Flask

from extensions import init_extensions, db, api
from models import *
from routes import register_routes

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    init_extensions(app)
    register_routes(api)
    
    with app.app_context():
        db.create_all()  # İlk çalıştırmada tabloları oluşturur
        
    return app

app = create_app()

def handler(event, context):
    return app(event, context)

