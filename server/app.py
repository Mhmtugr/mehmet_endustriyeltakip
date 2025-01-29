import os
import sys
from flask import Flask
from config import Config
from extensions import db, init_extensions  # api kaldırıldı (gerekmiyorsa)
from models import *
from routes import register_routes

# Modül yollarını ayarla (PythonAnywhere için kritik)
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Extensions'ları başlat (db, login_manager vb.)
    init_extensions(app)

    # Rotaları kaydet (api yerine doğrudan app kullanın)
    register_routes(app)  # Eğer register_routes, api yerine app alıyorsa

    # Veritabanı tablolarını oluştur
    with app.app_context():
        db.create_all()

    return app

app = create_app()

# Vercel için olan handler'ı SİLİN (PythonAnywhere'de gereksiz)
# def handler(event, context):
#     return app(event, context)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
