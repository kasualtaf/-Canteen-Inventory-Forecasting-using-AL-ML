import requests

url = "http://127.0.0.1:5000/predict"
data = {
    "Stock_Available (kg/L)": 50,
    "Reorder_Level (kg/L)": 20,
    "Ingredient": "Rice"
}

response = requests.post(url, json=data)
print(response.json())  # Print the API response
