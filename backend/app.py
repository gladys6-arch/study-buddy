from flask import Flask
from flask_cors import CORS
from models import db
from routes import api

def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)
    CORS(app)

    app.register_blueprint(api, url_prefix="/api")

    @app.route("/")
    def home():
        return {"message": "Study Buddy API is running"}

    return app

if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        db.create_all()
    app.run(debug=True)



