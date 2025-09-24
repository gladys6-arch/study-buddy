from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()

tutor_subjects = db.Table(
    "tutor_subjects",
    db.Column("tutor_id", db.Integer, db.ForeignKey("tutors.id"), primary_key=True),
    db.Column("subject_id", db.Integer, db.ForeignKey("subjects.id"), primary_key=True)
)


class Student(db.Model, SerializerMixin):
  __tablename__ = "students"

  id = db.Column(db.Integer, primary_key=True)
  name= db.Column(db.String, nullable=False)

  study_sessions=db.relationship("StudySession", back_populates="students")

  serialize_rules = ("-study_sessions.student",)

class Subject(db.Model, SerializerMixin):
  __tablename__ = "subjects"

  id = db.Column(db.Integer, primary_key=True)
  name =db.Column(db.String, nullable=False)

  tutors=db.relationship("Tutor", back_populates="subjects")
  serialize_rules = ("-study_sessions.subject", "-tutors.subjects")



class Tutor(db.Model, SerializerMixin):
  __tablename__ = "tutors"

  id= db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)

  subjects = db.relationship("Subject", back_populates="tutors")
  serialize_rules = ("-subjects.tutors",)


class StudySession(db.Model, SerializerMixin):
    __tablename__ = "study_sessions"

    id = db.Column(db.Integer, primary_key=True)
    notes = db.Column(db.Text, nullable=True)
    duration_minutes = db.Column(db.Integer)

    serialize_rules = ("-student.study_sessions", "-subject.study_sessions")



#backend coding 
#frontend coding using using react