from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()


class Student(db.Model, SerializerMixin):
    __tablename__ = "students"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=True)

    study_sessions = db.relationship("StudySession", back_populates="student")

    serialize_rules = ("-study_sessions.student",)


class Subject(db.Model, SerializerMixin):
    __tablename__ = "subjects"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    tutors = db.relationship("TutorSubject", back_populates="subject")
    study_sessions = db.relationship("StudySession", back_populates="subject")

    serialize_rules = ("-study_sessions.subject", "-tutors.subject")


class Tutor(db.Model, SerializerMixin):
    __tablename__ = "tutors"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)

    subjects = db.relationship("TutorSubject", back_populates="tutor")

    serialize_rules = ("-subjects.tutor",)


class TutorSubject(db.Model, SerializerMixin):
    __tablename__ = "tutor_subjects"

    id = db.Column(db.Integer, primary_key=True)
    tutor_id = db.Column(db.Integer, db.ForeignKey("tutors.id"), nullable=False)
    subject_id = db.Column(db.Integer, db.ForeignKey("subjects.id"), nullable=False)

    tutor = db.relationship("Tutor", back_populates="subjects")
    subject = db.relationship("Subject", back_populates="tutors")

    serialize_rules = ("-tutor.subjects", "-subject.tutors")


class StudySession(db.Model, SerializerMixin):
    __tablename__ = "study_sessions"

    id = db.Column(db.Integer, primary_key=True)
    notes = db.Column(db.Text, nullable=True)
    duration_minutes = db.Column(db.Integer)
    description = db.Column(db.String)
    status = db.Column(db.String, default="start", nullable=False)

    student_id = db.Column(db.Integer, db.ForeignKey("students.id"), nullable=True)
    subject_id = db.Column(db.Integer, db.ForeignKey("subjects.id"), nullable=True)

    student = db.relationship("Student", back_populates="study_sessions")
    subject = db.relationship("Subject", back_populates="study_sessions")

    serialize_rules = ("-student.study_sessions", "-subject.study_sessions")




