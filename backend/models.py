from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()

class Student(db.Model, SerializerMixin):
  __tablename__ = "students"

  id = db.Column(db.Integer, primary_key=True)
  name= db.Column(db.String, nullable=False)

  study_sessions=db.relationship("StudySession", back_populates="students")


class Subject(db.Model, SerializerMixin):
  __tablename__ = "subjects"

  id = db.Column(db.Integer, primary_key=True)
  name =db.Column(db.String, nullable=False)

  tutors=db.relationship("Tutor", back_populates="subjects")


class Tutor(db.Model, SerializerMixin):
  __tablename__ = "tutors"

  id= db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)

  subjects = db.relationship("Subject", back_populates="tutors")

class StudySession(db.Model, SerializerMixin):
  __tablename__ = "study_sessions"

  id = db.Column(db.Integer, primary_key=True)
  notes = db.column(db.String)
  duration_minutes = db.Column(db.Integer)

  student_id = db.Column(db.Integer, db.ForeignKey("students.id"))
  subject_id = db.Column(db.Integer, db.ForeignKey("subject.id"))

# the relationships

student = db.relationship("Student", back_populates="study_sessions")
subject = db.relationship("Subject", back_populates="study_sessions")

