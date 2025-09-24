from flask import Blueprint, request, jsonify
from models import db, StudySession  # assuming you have a Session model

# Create a Blueprint for session routes
session_bp = Blueprint("sessions", __name__, url_prefix="/sessions")

# GET all sessions
@session_bp.route("/", methods=["GET"])
def get_sessions():
    sessions = Session.query.all()
    return jsonify([s.to_dict() for s in sessions]), 200

# GET one session by id
@session_bp.route("/<int:id>", methods=["GET"])
def get_session(id):
    session = Session.query.get_or_404(id)
    return jsonify(session.to_dict()), 200

# POST create new session
@session_bp.route("/", methods=["POST"])
def create_session():
    data = request.get_json()
    new_session = Session(
        title=data.get("title"),
        description=data.get("description"),
        date=data.get("date")
    )
    db.session.add(new_session)
    db.session.commit()
    return jsonify(new_session.to_dict()), 201

# PUT update a session
@session_bp.route("/<int:id>", methods=["PUT"])
def update_session(id):
    session = Session.query.get_or_404(id)
    data = request.get_json()
    session.title = data.get("title", session.title)
    session.description = data.get("description", session.description)
    session.date = data.get("date", session.date)
    db.session.commit()
    return jsonify(session.to_dict()), 200

# DELETE a session
@session_bp.route("/<int:id>", methods=["DELETE"])
def delete_session(id):
    session = Session.query.get_or_404(id)
    db.session.delete(session)
    db.session.commit()
    return jsonify({"message": "Session deleted"}), 200
