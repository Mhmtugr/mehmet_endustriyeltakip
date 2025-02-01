# server/app.py
from flask import Flask, jsonify
from flask_restful import Api
from flask_cors import CORS
from server.config import Config
from server.extensions import db, init_extensions
from server.routes import register_routes

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app, resources={r"/*": {"origins": "*"}})  # Tüm istekler için CORS

    # Extensions'ları başlat
    init_extensions(app)

    # API nesnesini tanımla ve endpoint'leri ekle
    api = Api(app)
    register_routes(api)

    # Root URL için basit bir anasayfa (isteğe bağlı)
    @app.route('/')
    def index():
        return jsonify({"message": "Welcome to the Mehmet Endustriyeltakip API!"})

    # Veritabanı tablolarını oluştur
    with app.app_context():
        db.create_all()

    return app

app = create_app()

# WSGI sunucuları (Render, PythonAnywhere, vb.) için:
if __name__ != "__main__":
    application = app
