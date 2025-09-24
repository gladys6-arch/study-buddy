from flask import Blueprint, jsonify, request
from models import db, Tutor

tutor_bp = Blueprint("tutor", __name__, url_prefix="/tutors")

@tutor_bp.route("/", methods=["GET"])
def get_tutors():
    tutors = Tutor.query.all()
    return jsonify([{"id": t.id, "name": t.name, "email": t.email} for t in tutors])

@tutor_bp.route("/<int:id>", methods=["GET"])
def get_tutor(id):
    tutor = Tutor.query.get_or_404(id)
    return jsonify({"id": tutor.id, "name": tutor.name, "email": tutor.email})

@tutor_bp.route("/", methods=["POST"])
def create_tutor():
    data = request.get_json()
    new_tutor = Tutor(name=data["name"], email=data["email"])
    db.session.add(new_tutor)
    db.session.commit()
    return jsonify({"message": "Tutor created", "id": new_tutor.id}), 201

@tutor_bp.route("/<int:id>", methods=["PUT"])
def update_tutor(id):
    tutor = Tutor.query.get_or_404(id)
    data = request.get_json()
    tutor.name = data.get("name", tutor.name)
    tutor.email = data.get("email", tutor.email)
    db.session.commit()
    return jsonify({"message": "Tutor updated"})

@tutor_bp.route("/<int:id>", methods=["DELETE"])
def delete_tutor(id):
    tutor = Tutor.query.get_or_404(id)
    db.session.delete(tutor)
    db.session.commit()
   # return jsonify({"message": "Tutor deleted"})
    return jsonify({"message": "TutorSubject deleted"}), 200
