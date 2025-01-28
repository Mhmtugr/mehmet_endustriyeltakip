import sys
import os

from server.config import Config  # <-- Doğru import yolu!
from flask import Flask

from server.extensions import init_extensions, db, api  # <-- Doğru import yolu!
from server.models import *  # <-- Doğru import yolu!
from server.routes import register_routes  # <-- Doğru import yolu!

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    init_extensions(app)
    register_routes(api)
    
    with app.app_context():
        db.create_all()  # İlk çalıştırmada tabloları oluşturur
        
    return app

app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
