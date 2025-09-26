from flask import Blueprint, jsonify, request
from models import db, Subject

subject_bp = Blueprint("subject", __name__)

# GET all subjects
@subject_bp.route("/", methods=["GET"])
def get_subjects():
    subjects = Subject.query.all()
    return jsonify([{"id": s.id, "name": s.name} for s in subjects])

# GET single subject
@subject_bp.route("/<int:id>", methods=["GET"])
def get_subject(id):
    subject = Subject.query.get_or_404(id)
    return jsonify({"id": subject.id, "name": subject.name})

# POST create subject
@subject_bp.route("/", methods=["POST"])
def create_subject():
    data = request.get_json()
    new_subject = Subject(name=data["name"])
    db.session.add(new_subject)
    db.session.commit()
    return jsonify({"message": "Subject created", "id": new_subject.id}), 201

# PUT update subject
@subject_bp.route("/<int:id>", methods=["PUT"])
def update_subject(id):
    subject = Subject.query.get_or_404(id)
    data = request.get_json()
    subject.name = data.get("name", subject.name)
    db.session.commit()
    return jsonify({"message": "Subject updated"})

# DELETE subject
@subject_bp.route("/<int:id>", methods=["DELETE"])
def delete_subject(id):
    subject = Subject.query.get_or_404(id)
    # Delete related records first
    for session in subject.study_sessions:
        db.session.delete(session)
    for tutor_subject in subject.tutors:
        db.session.delete(tutor_subject)
    db.session.delete(subject)
    db.session.commit()
    return jsonify({"message": "Subject deleted"}), 200
