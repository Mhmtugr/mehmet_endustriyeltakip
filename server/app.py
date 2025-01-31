import os
import sys
from flask import Flask
from server.config import Config
from server.extensions import db, init_extensions
from server.models import *  # Tüm Modeller İçin
from server.routes import register_routes

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Extensions'ları başlat
    init_extensions(app)

    # Rotaları ekle
    register_routes(app)

    # Veritabanı tablolarını oluştur
    with app.app_context():
        db.create_all()

    return app

app = create_app()

# PythonAnywhere için özel çalıştırma komutu
if __name__ != "__main__":
    application = app  # WSGI için application nesnesini tanımla
