from flask import Blueprint, request, jsonify
from models import db, StudySession

study_session_bp = Blueprint("study_sessions", __name__, url_prefix="/study-sessions")  # ✅ fixed

# GET all study sessions
@study_session_bp.route("/", methods=["GET"])
def get_study_sessions():
    sessions = StudySession.query.all()
    return jsonify([s.to_dict() for s in sessions]), 200

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
        # remove tutor_id if not part of model
        # scheduled_time=data.get("scheduled_time") if field exists
    )
    db.session.add(new_session)
    db.session.commit()
    return jsonify(new_session.to_dict()), 201

# DELETE a study session
@study_session_bp.route("/<int:id>", methods=["DELETE"])
def delete_study_session(id):
    session = StudySession.query.get_or_404(id)
    db.session.delete(session)
    db.session.commit()
    return jsonify({"message": "Study session deleted"}), 200
