from flask import Flask
from flask_migrate import Migrate
from models import db
from routes.session.routes import session_bp

from routes.user_routes import user_bp
from routes.subject_routes import subject_bp
from routes.session_routes import session_bp



def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)
    Migrate(app, db)



    

    @app.route("/")
    def home():
        return {"message": "Study Buddy API is running"}


    app.register_blueprint(user_bp)
    app.register_blueprint(subject_bp)
    app.register_blueprint(session_bp)


    return app

if __name__ == "__main__":
    create_app().run(debug=True)



