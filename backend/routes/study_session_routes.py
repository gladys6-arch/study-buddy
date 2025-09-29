from flask import Blueprint, request, jsonify
from models import db, StudySession

study_session_bp = Blueprint("study_sessions", __name__, url_prefix="/study-sessions")  # ✅ fixed

# GET all study sessions
@study_session_bp.route("/", methods=["GET"])
def get_study_sessions():
    sessions = StudySession.query.all()
    return jsonify([{
        "id": s.id,
        "notes": s.notes,
        "duration_minutes": s.duration_minutes,
        "description": s.description,
        "status": s.status,
        "student_name": s.student.name if s.student else None,
        "subject_name": s.subject.name if s.subject else None,
        "tutor_name": s.tutor.name if s.tutor else None,
        "student_id": s.student_id,
        "subject_id": s.subject_id,
        "tutor_id": s.tutor_id
    } for s in sessions]), 200

# GET single study session by id
@study_session_bp.route("/<int:id>", methods=["GET"])
def get_study_session(id):
    session = StudySession.query.get_or_404(id)
    return jsonify(session.to_dict()), 200

# POST create new study session
@study_session_bp.route("/", methods=["POST"])
def create_study_session():
    data = request.get_json()
    new_session = StudySession(
        student_id=data.get("student_id"),
        subject_id=data.get("subject_id"),
        tutor_id=data.get("tutor_id"),
        notes=data.get("notes"),
        duration_minutes=data.get("duration_minutes"),
        description=data.get("description"),
        status=data.get("status", "start")
    )
    db.session.add(new_session)
    db.session.commit()
    return jsonify(new_session.to_dict()), 201

# PUT update study session
@study_session_bp.route("/<int:id>", methods=["PUT"])
def update_study_session(id):
    session = StudySession.query.get_or_404(id)
    data = request.get_json()
    
    session.status = data.get("status", session.status)
    session.notes = data.get("notes", session.notes)
    session.duration_minutes = data.get("duration_minutes", session.duration_minutes)
    session.description = data.get("description", session.description)
    
    db.session.commit()
    return jsonify({"message": "Study session updated"}), 200

# DELETE a study session
@study_session_bp.route("/<int:id>", methods=["DELETE"])
def delete_study_session(id):
    session = StudySession.query.get_or_404(id)
    db.session.delete(session)
    db.session.commit()
    return jsonify({"message": "Study session deleted"}), 200
