from app import create_app  # import the factory
from models import db, Student, Subject, Tutor, TutorSubject, StudySession

# Create an app instance
app = create_app()

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

    # Link tutors to subjects (many-to-many)
    ts1 = TutorSubject(tutor=t1, subject=math)
    ts2 = TutorSubject(tutor=t1, subject=science)
    ts3 = TutorSubject(tutor=t2, subject=history)

    # Study sessions
    session1 = StudySession(student=s1, subject=math, description="Algebra basics")
    session2 = StudySession(student=s2, subject=science, description="Physics revision")

    # Add everything to the session
    db.session.add_all([s1, s2, math, science, history, t1, t2, ts1, ts2, ts3, session1, session2])
    db.session.commit()

    print("✅ Database seeded successfully!")
