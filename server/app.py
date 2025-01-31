import os
import sys
from flask import Flask
from flask_restful import Api
from server.config import Config
from server.extensions import db, init_extensions
from server.models import *  # Tüm modelleri içe aktar
from server.routes import register_routes


from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)  # Tüm istekler için CORS aç
    api = Api(app)
    register_routes(api)
    app.config.from_object(Config)

    # Extensions'ları başlat
    init_extensions(app)

    # Veritabanı tablolarını oluştur
    with app.app_context():
        db.create_all()

    return app



def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # API Nesnesini Tanımla
    api = Api(app)

    # Extensions'ları başlat
    init_extensions(app)

    # API rotalarını ekle
    register_routes(api)

    # Veritabanı tablolarını oluştur
    with app.app_context():
        db.create_all()

    return app

app = create_app()

# PythonAnywhere veya Render gibi WSGI ortamları için
if __name__ != "__main__":
    application = app  # WSGI için application nesnesini tanımla
