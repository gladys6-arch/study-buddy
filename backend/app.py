from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Student, Subject, Tutor, StudySession



def create_app():
  app = Flask(__name__)
  app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
  app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

  db.init_app(app)
  CORS(app)


@app.route('/')
def home():
  return {"message": "Study buddy API is running"}

  return  app 


if __name__ == "__main__":
  app = create_app()
  app.run(debug=True)


