from flask import Flask
from .config import Config
from .extensions import init_extensions, db, api
from .models import *
from .routes import register_routes

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
    app.run(host="0.0.0.0", port=5000, debug=True)
