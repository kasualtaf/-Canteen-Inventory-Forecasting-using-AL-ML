# Canteen Inventory Forecast Application

A full-stack application that predicts purchase quantities for canteen inventory using machine learning.

## Features

- 🎯 Real-time inventory purchase predictions
- 📊 Interactive visualization of prediction history
- 🎨 Modern, responsive UI with animations
- 🔄 RESTful API backend with Flask
- 📱 Mobile-friendly design

## Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- Recharts for data visualization
- Axios for API requests

### Backend
- Flask
- scikit-learn
- NumPy
- pandas

## Setup Instructions

### Prerequisites
- Python 3.8 or higher
- Node.js 14 or higher
- npm (Node Package Manager)

### Running the Application in VS Code

1. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   .\venv\Scripts\activate
   cd backend
   python -m venv venv
   ```
   The backend server will start on http://127.0.0.1:5000

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```
   The frontend will start on http://localhost:3000

## Application Usage

### Input Parameters
1. **Stock Available (kg/L)**
   - Current quantity of stock available in the inventory
   - Must be a numeric value
   - Example: 100.5

2. **Reorder Level (kg/L)**
   - The minimum stock level at which reordering should be considered
   - Must be a numeric value
   - Example: 50.0

3. **Ingredient Code**
   - Unique identifier for the ingredient
   - Must be a numeric value
   - Example: 1001

### Output
The application provides:
1. **Predicted Purchase Quantity**
   - Shows the recommended purchase quantity in kg/L
   - Displayed as a number with 2 decimal places
   - Example: 75.50 kg/L

2. **Prediction History**
   - A line chart showing all previous predictions
   - X-axis: Time of prediction
   - Y-axis: Predicted quantity
   - Helps track prediction patterns over time

## API Endpoints

### POST /predict
Predicts the purchase quantity based on input features.

Request body:
```json
{
  "features": [10, 20, 30]
}
```

Response:
```json
{
  "status": "success",
  "prediction": 42.5
}
```

## Troubleshooting

1. **If the backend fails to start:**
   - Make sure no other application is using port 5000
   - Check if Python and required packages are installed correctly
   - Verify that you're in the virtual environment (venv)

2. **If the frontend fails to start:**
   - Make sure no other application is using port 3000
   - Run `npm install` again to ensure all dependencies are installed
   - Clear npm cache using `npm cache clean --force`

3. **If predictions fail:**
   - Ensure the backend server is running
   - Check if all input fields have valid numeric values
   - Verify network connectivity between frontend and backend

## Notes
- Keep both frontend and backend servers running simultaneously
- The application uses a RESTful API architecture
- All data is processed in real-time
- The interface automatically updates with new predictions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.