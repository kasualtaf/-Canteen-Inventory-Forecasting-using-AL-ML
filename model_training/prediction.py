import joblib

# Correct absolute path to your model
model_path = r"D:\PROJECTS\canteen_inventory_forecast\model_training\pulao_inventory_xgb_model.pkl"

# Load the trained model
model = joblib.load(model_path)

print("Model loaded successfully!")
