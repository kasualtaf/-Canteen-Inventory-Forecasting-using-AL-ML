import joblib

# Load your model
MODEL_PATH = "d:/PROJECTS/canteen_inventory_forecast/model_training/pulao_inventory_xgb_model.pkl"
model = joblib.load(MODEL_PATH)

# Print expected number of features
print("Expected number of features:", model.n_features_in_)
