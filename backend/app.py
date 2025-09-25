from flask import Flask
from flask_migrate import Migrate 
from flask_cors import CORS
from models import db

# routes
from routes.session_routes import session_bp
from routes.students_routes import student_bp
from routes.subject_routes import subject_bp
from routes.tutor_routes import tutor_bp
from routes.tutor_subject_routes import tutor_subject_bp
from routes.study_session_routes import study_session_bp


def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


    
    allowed_origins = ["http://localhost:5173", "http://localhost:5174"]
    CORS(app, supports_credentials=True, resources={r"/api/*": {"origins": allowed_origins}})



    db.init_app(app)
    Migrate(app, db)

    @app.route("/")
    def home():
        return {"message": "Study Buddy API is running 🚀"}

    # Register blueprints
    app.register_blueprint(student_bp, url_prefix="/api/students")
    app.register_blueprint(subject_bp, url_prefix="/api/subjects")
    app.register_blueprint(tutor_bp, url_prefix="/api/tutors")
    app.register_blueprint(session_bp, url_prefix="/api/sessions")
    app.register_blueprint(tutor_subject_bp, url_prefix="/api/tutor-subjects")
    app.register_blueprint(study_session_bp, url_prefix="/api/study-sessions")


    return app


if __name__ == "__main__":
    create_app().run(debug=True)
