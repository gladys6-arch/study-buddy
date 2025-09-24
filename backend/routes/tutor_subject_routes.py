from flask import Blueprint, jsonify, request
from models import db, TutorSubject

tutor_subject_bp = Blueprint("tutor_subject", __name__, url_prefix="/tutor-subjects")

@tutor_subject_bp.route("/", methods=["GET"])
def get_tutor_subjects():
    ts = TutorSubject.query.all()
    return jsonify([{"id": t.id, "tutor_id": t.tutor_id, "subject_id": t.subject_id} for t in ts])

@tutor_subject_bp.route("/<int:id>", methods=["GET"])
def get_tutor_subject(id):
    t = TutorSubject.query.get_or_404(id)
    return jsonify({"id": t.id, "tutor_id": t.tutor_id, "subject_id": t.subject_id})

@tutor_subject_bp.route("/", methods=["POST"])
def create_tutor_subject():
    data = request.get_json()
    new_ts = TutorSubject(tutor_id=data["tutor_id"], subject_id=data["subject_id"])
    db.session.add(new_ts)
    db.session.commit()
    return jsonify({"message": "Tutor-Subject link created", "id": new_ts.id}), 201

@tutor_subject_bp.route("/<int:id>", methods=["DELETE"])
def delete_tutor_subject(id):
    t = TutorSubject.query.get_or_404(id)
    db.session.delete(t)
    db.session.commit()
    return jsonify({"message": "Tutor-Subject link deleted"})
