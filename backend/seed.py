from app import app
from models import db, Student, Subject, Tutor, TutorSubject, StudySession

with app.app_context():
    # Drop & recreate tables
    db.drop_all()
    db.create_all()

    # Add students
    s1 = Student(name="Alice Johnson", email="alice@example.com")
    s2 = Student(name="Bob Williams", email="bob@example.com")

# Add subjects
    math = Subject(name="Mathematics")
    science = Subject(name="Science")
    history = Subject(name="History")

    # Add tutors
    t1 = Tutor(name="Dr. Smith", email="smith@example.com")
    t2 = Tutor(name="Prof. Brown", email="brown@example.com")
