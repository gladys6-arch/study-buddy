from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(_name_)
CORS(app)

# In-memory storage
students = [{"id": 1, "name": "Test Student", "email": "test@test.com"}]
tutors = [{"id": 1, "name": "Test Tutor", "email": "tutor@test.com"}]
subjects = [{"id": 1, "name": "Test Subject"}]
sessions = [{"id": 1, "notes": "Test Session", "duration_minutes": 60}]

# Counter for IDs
counters = {"students": 2, "tutors": 2, "subjects": 2, "sessions": 2}

@app.route("/")
def home():
    return {"message": "Test API is running"}

# STUDENTS CRUD
@app.route("/api/students", methods=["GET"])
def get_students():
    return students

@app.route("/api/students", methods=["POST"])
def create_student():
    data = request.get_json()
    new_student = {
        "id": counters["students"],
        "name": data["name"],
        "email": data["email"]
    }
    students.append(new_student)
    counters["students"] += 1
    return {"message": "Student created", "id": new_student["id"]}, 201

@app.route("/api/students/<int:id>", methods=["DELETE"])
def delete_student(id):
    global students
    students = [s for s in students if s["id"] != id]
    return {"message": "Student deleted"}

# TUTORS CRUD
@app.route("/api/tutors", methods=["GET"])
def get_tutors():
    return tutors

@app.route("/api/tutors", methods=["POST"])
def create_tutor():
    data = request.get_json()
    new_tutor = {
        "id": counters["tutors"],
        "name": data["name"],
        "email": data["email"]
    }
    tutors.append(new_tutor)
    counters["tutors"] += 1
    return {"message": "Tutor created", "id": new_tutor["id"]}, 201

@app.route("/api/tutors/<int:id>", methods=["DELETE"])
def delete_tutor(id):
    global tutors
    tutors = [t for t in tutors if t["id"] != id]
    return {"message": "Tutor deleted"}

# SUBJECTS CRUD
@app.route("/api/subjects", methods=["GET"])
def get_subjects():
    return subjects

@app.route("/api/subjects", methods=["POST"])
def create_subject():
    data = request.get_json()
    new_subject = {
        "id": counters["subjects"],
        "name": data["name"]
    }
    subjects.append(new_subject)
    counters["subjects"] += 1
    return {"message": "Subject created", "id": new_subject["id"]}, 201

@app.route("/api/subjects/<int:id>", methods=["DELETE"])
def delete_subject(id):
    global subjects
    subjects = [s for s in subjects if s["id"] != id]
    return {"message": "Subject deleted"}

# STUDY SESSIONS CRUD
@app.route("/api/study-sessions", methods=["GET"])
def get_sessions():
    return sessions

@app.route("/api/study-sessions", methods=["POST"])
def create_session():
    data = request.get_json()
    new_session = {
        "id": counters["sessions"],
        "notes": data.get("notes", ""),
        "duration_minutes": data.get("duration_minutes", 60)
    }
    sessions.append(new_session)
    counters["sessions"] += 1
    return {"message": "Session created", "id": new_session["id"]}, 201

@app.route("/api/study-sessions/<int:id>", methods=["DELETE"])
def delete_session(id):
    global sessions
    sessions = [s for s in sessions if s["id"] != id]
    return {"message": "Session deleted"}

if __name__ == "__main__":
    app.run(debug=True, port=5000)