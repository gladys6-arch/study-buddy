from flask import Blueprint, jsonify

user_bp = Blueprint("user", __name__, url_prefix="/users")

@user_bp.route("/", methods=["GET"])
def get_users():
    return jsonify([
        {"id": 1, "name": "Alice"},
        {"id": 2, "name": "Bob"}
    ])
