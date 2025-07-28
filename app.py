from flask import Flask, request, jsonify, render_template
import pickle
import numpy as np

# Load the model
with open("model.pkl", "rb") as file:
    model = pickle.load(file)

# Initialize Flask app
app = Flask(__name__)

@app.route('/')
def index():
    # Render the HTML file
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    features = np.array([
        data["area"],
        data["bedrooms"],
        data["bathrooms"],
        data["stories"],
        data["parking"]
    ]).reshape(1, -1)
    
    # Predict house price
    prediction = model.predict(features)
    return jsonify({"predicted_price": float(prediction[0])})

if __name__ == "__main__":
    app.run(debug=True)
