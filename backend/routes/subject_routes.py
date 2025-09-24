# routes/subject_routes.py

from flask import Blueprint, request, jsonify
from models import db, Subject

subject_bp = Blueprint("subject_bp", __name__, url_prefix="/subjects")

# GET all subjects
@subject_bp.route("/", methods=["GET"])
def get_subjects():
    subjects = Subject.query.all()
    return jsonify([s.to_dict() for s in subjects]), 200


# GET a single subject by ID
@subject_bp.route("/<int:id>", methods=["GET"])
def get_subject(id):
    subject = Subject.query.get(id)
    if not subject:
        return jsonify({"error": "Subject not found"}), 404
    return jsonify(subject.to_dict()), 200


# POST - create a new subject
@subject_bp.route("/", methods=["POST"])
def create_subject():
    data = request.get_json()
    if not data or "name" not in data:
        return jsonify({"error": "Name is required"}), 400
    
    new_subject = Subject(
        name=data["name"],
        description=data.get("description", "")
    )
    db.session.add(new_subject)
    db.session.commit()
    
    return jsonify(new_subject.to_dict()), 201


# PUT - update a subject
@subject_bp.route("/<int:id>", methods=["PUT"])
def update_subject(id):
    subject = Subject.query.get(id)
    if not subject:
        return jsonify({"error": "Subject not found"}), 404
    
    data = request.get_json()
    if "name" in data:
        subject.name = data["name"]
    if "description" in data:
        subject.description = data["description"]

    db.session.commit()
    return jsonify(subject.to_dict()), 200


# DELETE - remove a subject
@subject_bp.route("/<int:id>", methods=["DELETE"])
def delete_subject(id):
    subject = Subject.query.get(id)
    if not subject:
        return jsonify({"error": "Subject not found"}), 404
    
    db.session.delete(subject)
    db.session.commit()
    return jsonify({"message": "Subject deleted"}), 200
