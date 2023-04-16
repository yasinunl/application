from db.models import db
from db import create_app

def createDB():
    app = create_app()
    with app.app_context():
        db.create_all()