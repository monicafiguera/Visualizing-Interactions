from flask import Flask, render_template, request, Response, session
from flask.json import jsonify
import json


app = Flask(__name__)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template('index.html')

#######################################################

if __name__ == "__main__":
    app.run(port=3002, host="0.0.0.0")