from flask import Blueprint, jsonify, request
from models import db, Student

student_bp = Blueprint("student", __name__)

# GET all students
@student_bp.route("/", methods=["GET"])
def get_students():
    students = Student.query.all()
    return jsonify([{
        "id": s.id, 
        "name": s.name, 
        "email": s.email,
        "study_sessions_count": len(s.study_sessions)
    } for s in students])

# GET single student by id
@student_bp.route("/<int:id>", methods=["GET"])
def get_student(id):
    student = Student.query.get_or_404(id)
    return jsonify({"id": student.id, "name": student.name, "email": student.email})

# POST create a new student
@student_bp.route("/", methods=["POST"])
def create_student():
    data = request.get_json()
    new_student = Student(name=data["name"], email=data.get("email"))
    db.session.add(new_student)
    db.session.commit()
    return jsonify({"message": "Student created", "id": new_student.id}), 201

# PUT update student
@student_bp.route("/<int:id>", methods=["PUT"])
def update_student(id):
    student = Student.query.get_or_404(id)
    data = request.get_json()
    student.name = data.get("name", student.name)
    student.email = data.get("email", student.email)
    db.session.commit()
    return jsonify({"message": "Student updated"})

# DELETE student
@student_bp.route("/<int:id>", methods=["DELETE"])
def delete_student(id):
    student = Student.query.get_or_404(id)
    # Delete related study sessions first
    for session in student.study_sessions:
        db.session.delete(session)
    db.session.delete(student)
    db.session.commit()
    return jsonify({"message": "Student deleted"})
