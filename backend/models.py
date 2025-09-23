from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()

class Student(db.Model, SerializerMixin):
  __tablename__ = "students"

  id = db.Column(db.Integer, primary_key=True)
  name= db.Column(db.String, nullable=False)


class Subject(db.Model, SerializerMixin):
  __tablename__ = "subjects"

  id = db.Column(db.Integer, primary_key=True)
  name =db.Column(db.String, nullable=False)


class Tutor(db.Model, SerializerMixin):
  __tablename__ = "tutors"

  id= db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)

class StudySession(db.Model, SerializerMixin):
  __tablename__ = "study_sessions"

  id = db.Column(db.Integer, primary_key=True)
  notes = db.column(db.String)
  duration_minutes = db.Column(db.Integer)

  
