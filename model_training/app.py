from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load the trained model
MODEL_PATH = "d:/PROJECTS/canteen_inventory_forecast/model_training/pulao_inventory_xgb_model.pkl"
model = joblib.load(MODEL_PATH)

@app.route('/')
def home():
    return "Canteen Inventory Forecasting API is running!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data from the request
        data = request.get_json()

        # Convert input data to NumPy array and reshape it
        input_features = np.array(data['features']).reshape(1, -1)

        # Make a prediction
        prediction = model.predict(input_features)

        # Convert NumPy float to Python float (to avoid serialization error)
        response = {"prediction": float(prediction[0])}

        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
