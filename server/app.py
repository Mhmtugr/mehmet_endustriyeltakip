# server/app.py
import os
from flask import Flask, jsonify
from flask_restful import Api
from flask_cors import CORS
from server.config import Config
from server.extensions import db, init_extensions
from server.routes import register_routes

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app, resources={r"/*": {"origins": "*"}})

    # API Nesnesini Tanımla
    api = Api(app)

    # Extensions'ları başlat
    init_extensions(app)

    # API rotalarını ekle
    register_routes(api)

    # Basit bir anasayfa rotası ekleyelim:
    @app.route('/')
    def index():
        return jsonify({"message": "Welcome to the Mehmet Endustriyeltakip API!"})

    # Veritabanı tablolarını oluştur
    with app.app_context():
        db.create_all()

    return app

app = create_app()

if __name__ != "__main__":
    application = app  # WSGI ortamları için
