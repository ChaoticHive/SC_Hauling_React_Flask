from logging import Logger
from flask import Flask, send_from_directory, jsonify
import json
import os
from flask_cors import CORS

app = Flask(__name__, static_folder="../sc_hauling_frontend/app", static_url_path="/")
CORS(app)  # Enable CORS for all routes
logger = Logger("sc_hauling_backend")
# @app.route('/')
# def home():
#     return send_from_directory(app.static_folder, 'index.html')


@app.route('/api/waypoints')
def waypoints():
    json_path = os.path.join(os.path.dirname(__file__), 'data', 'stanton_locations.json')
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    names = sorted({entry["Waypoint Name"] for entry in data if entry.get("Waypoint Name")})
    return jsonify(names)

@app.route('/api/items')
def items():
    items_list = ["Scrap", "Medical Supplies", "Food", "Minerals"]
    return jsonify(items_list)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)  # accessible on LAN
    
