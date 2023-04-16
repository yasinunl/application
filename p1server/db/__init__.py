from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
from flask_jwt_extended import JWTManager
from datetime import  timedelta

db = SQLAlchemy()

def create_app():
    app = Flask(__name__,  static_folder='static')
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost:5432/freelancer'
    app.config["JWT_SECRET_KEY"] = "JWT_SECRET_KEY"
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=1)
    JWTManager(app)
    db.init_app(app)
    return app
