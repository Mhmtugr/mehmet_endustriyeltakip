import os
from flask import Flask
from server.config import Config
from server.extensions import db, init_extensions
from server.models import *
from server.routes import register_routes

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    init_extensions(app)  # db, cors init
    register_routes(app)  # blueprint or restful routes

    with app.app_context():
        db.create_all()

    return app

app = create_app()

# PythonAnywhere WSGI
if __name__ != "__main__":
    application = app
