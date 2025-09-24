from flask import Blueprint, jsonify, request
from models import db, TutorSubject

tutor_subject_bp = Blueprint("tutor_subject", __name__, url_prefix="/tutor-subjects")

@tutor_subject_bp.route("/", methods=["GET"])
def get_tutor_subjects():
    tutor_subjects = TutorSubject.query.all()
    return jsonify([ts.to_dict() for ts in tutor_subjects]), 200


# GET one tutor-subject by id
@tutor_subject_bp.route("/<int:id>", methods=["GET"])
def get_tutor_subject(id):
    ts = TutorSubject.query.get_or_404(id)
    return jsonify(ts.to_dict()), 200


# POST create new association
@tutor_subject_bp.route("/", methods=["POST"])
def create_tutor_subject():
    data = request.get_json()
    new_ts = TutorSubject(
        tutor_id=data.get("tutor_id"),
        subject_id=data.get("subject_id")
    )
    db.session.add(new_ts)
    db.session.commit()
    return jsonify(new_ts.to_dict()), 201


# DELETE association
@tutor_subject_bp.route("/<int:id>", methods=["DELETE"])
def delete_tutor_subject(id):
    ts = TutorSubject.query.get_or_404(id)
    db.session.delete(ts)
    db.session.commit()
    return jsonify({"message": "TutorSubject deleted"}), 200