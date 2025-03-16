import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { PredictionRequest, PredictionResponse, PredictionHistory } from './types';

const App: React.FC = () => {
  const [features, setFeatures] = useState<number[]>([0, 0, 0]);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<PredictionHistory[]>([]);

  const handleInputChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = Number(value);
    setFeatures(newFeatures);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<PredictionResponse>(
        'http://127.0.0.1:5000/predict',
        { features } as PredictionRequest
      );

      setPrediction(response.data.prediction);
      setHistory([
        ...history,
        {
          features: [...features],
          prediction: response.data.prediction,
          timestamp: new Date()
        }
      ]);
    } catch (err) {
      setError('Failed to get prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 sm:px-10">
            <h1 className="text-3xl font-extrabold text-white">
              Canteen Inventory Forecast
            </h1>
            <p className="mt-2 text-blue-100">
              Predict purchase quantities based on inventory data
            </p>
          </div>

          <div className="px-6 py-8 sm:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Form */}
              <div className="space-y-6">
                <div className="bg-blue-50 rounded-xl p-6">
                  <h2 className="text-xl font-semibold text-blue-900 mb-4">Input Parameters</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-blue-700">
                        Stock Available (kg/L)
                      </label>
                      <input
                        type="number"
                        value={features[0]}
                        onChange={(e) => handleInputChange(0, e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-blue-700">
                        Reorder Level (kg/L)
                      </label>
                      <input
                        type="number"
                        value={features[1]}
                        onChange={(e) => handleInputChange(1, e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-blue-700">
                        Ingredient Code
                      </label>
                      <input
                        type="number"
                        value={features[2]}
                        onChange={(e) => handleInputChange(2, e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full flex justify-center py-3 px-4 rounded-md text-sm font-semibold text-white
                        ${loading 
                          ? 'bg-blue-400 cursor-not-allowed' 
                          : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                        }`}
                    >
                      {loading ? (
                        <motion.svg
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 text-white"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </motion.svg>
                      ) : (
                        'Generate Prediction'
                      )}
                    </button>
                  </form>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="rounded-md bg-red-50 p-4"
                  >
                    <div className="flex">
                      <div className="text-red-700">{error}</div>
                    </div>
                  </motion.div>
                )}

                {prediction !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl bg-green-50 p-6"
                  >
                    <h3 className="text-lg font-medium text-green-900">Predicted Purchase Quantity</h3>
                    <p className="mt-2 text-3xl font-bold text-green-600">
                      {prediction.toFixed(2)} kg/L
                    </p>
                  </motion.div>
                )}
              </div>

              {/* History Chart */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Prediction History</h2>
                {history.length > 0 ? (
                  <LineChart width={400} height={300} data={history.map(h => ({
                    timestamp: h.timestamp.toLocaleTimeString(),
                    prediction: h.prediction
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="timestamp" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="prediction" 
                      stroke="#2563eb"
                      strokeWidth={2}
                      dot={{ fill: '#2563eb' }}
                    />
                  </LineChart>
                ) : (
                  <div className="flex items-center justify-center h-64 text-gray-500">
                    No predictions yet
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default App;