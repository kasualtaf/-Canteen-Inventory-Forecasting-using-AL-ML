import joblib
import pandas as pd

# Load the trained model
model_path = r"D:\PROJECTS\canteen_inventory_forecast\model_training\pulao_inventory_xgb_model.pkl"
model = joblib.load(model_path)

# Print expected feature names
expected_features = ['Stock_Available (kg/L)', 'Reorder_Level (kg/L)', 'Ingredient']
print("Expected Features:", expected_features)

# Create new sample input data
new_data_values = [[10, 5, 1]]  # Adjust values as needed
new_data = pd.DataFrame(new_data_values, columns=expected_features)

# Ensure 'Ingredient' is correctly encoded
if 'Ingredient' in new_data.columns and new_data['Ingredient'].dtype == 'object':
    new_data['Ingredient'] = new_data['Ingredient'].astype('category').cat.codes

# Make prediction
predicted_value = model.predict(new_data)
print("Predicted Inventory Requirement:", predicted_value)
