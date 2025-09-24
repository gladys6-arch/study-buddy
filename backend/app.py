from flask import Flask
from flask_cors import CORS
from models import db


def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)
    CORS(app)

    

    @app.route("/")
    def home():
        return {"message": "Study Buddy API is running"}


    app.register_blueprint(user_bp)
    app.register_blueprint(subject_bp)
    app.register_blueprint(session_bp)


    return app

if __name__ == "__main__":
    create_app().run(debug=True)



