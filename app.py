
from flask import Flask, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

coaches = {
    "C1": {"booked": 8, "estimated_count": 8},
    "C2": {"booked": 12, "estimated_count": 10},
    "C3": {"booked": 6, "estimated_count": 6}
}

@app.route("/")
def home():
    return jsonify({
        "project": "RailGuard AI",
        "message": "Backend is running successfully!",
        "status": "Online"
    })

@app.route("/api/status")
def status():
    return jsonify({
        "status": "Online",
        "project": "RailGuard AI",
        "time": datetime.now().isoformat()
    })

@app.route("/api/coaches")
def get_coaches():
    return jsonify(coaches)

@app.route("/api/verification")
def verification():
    results = []

    for coach, data in coaches.items():
        difference = data["booked"] - data["estimated_count"]

        results.append({
            "coach": coach,
            "booked": data["booked"],
            "estimated_count": data["estimated_count"],
            "difference": difference,
            "review_required": difference != 0,
            "note": "Please review manually"
        })

    return jsonify(results)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
  
