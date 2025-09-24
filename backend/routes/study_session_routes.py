from flask import Blueprint, jsonify, request
from models import db, StudySession

session_bp = Blueprint("session", __name__, url_prefix="/sessions")

@session_bp.route("/", methods=["GET"])
def get_sessions():
    sessions = StudySession.query.all()
    return jsonify([
        {"id": s.id, "topic": s.topic, "date": s.date.isoformat(), "student_id": s.student_id, "tutor_id": s.tutor_id}
        for s in sessions
    ])

@session_bp.route("/<int:id>", methods=["GET"])
def get_session(id):
    s = StudySession.query.get_or_404(id)
    return jsonify({"id": s.id, "topic": s.topic, "date": s.date.isoformat(), "student_id": s.student_id, "tutor_id": s.tutor_id})

@session_bp.route("/", methods=["POST"])
def create_session():
    data = request.get_json()
    new_session = StudySession(
        topic=data["topic"],
        date=data["date"],  # make sure this is ISO string
        student_id=data["student_id"],
        tutor_id=data["tutor_id"]
    )
    db.session.add(new_session)
    db.session.commit()
    return jsonify({"message": "Session created", "id": new_session.id}), 201

@session_bp.route("/<int:id>", methods=["PUT"])
def update_session(id):
    s = StudySession.query.get_or_404(id)
    data = request.get_json()
    s.topic = data.get("topic", s.topic)
    s.date = data.get("date", s.date)
    s.student_id = data.get("student_id", s.student_id)
    s.tutor_id = data.get("tutor_id", s.tutor_id)
    db.session.commit()
    return jsonify({"message": "Session updated"})

@session_bp.route("/<int:id>", methods=["DELETE"])
def delete_session(id):
    s = StudySession.query.get_or_404(id)
    db.session.delete(s)
    db.session.commit()
    return jsonify({"message": "Session deleted"})
