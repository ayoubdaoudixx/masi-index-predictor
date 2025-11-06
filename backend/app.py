"""
MASI Prediction API
Flask backend for serving Linear Regression predictions
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

# Load and prepare the dataset
dataset_path = os.path.join(os.path.dirname(__file__), '..', 'src', 'Data', 'Dataset.xlsx')
df = pd.read_excel(dataset_path)

# Data preprocessing (matching the notebook)
df['DATE'] = pd.to_datetime(df['SEANCE'], format='%Y-%m-%d %H:%M:%S.%f')
df.drop(columns=['INDICE'], inplace=True)

# Prepare features and target
# Based on the form inputs, we use these features
feature_columns = ['COURS_PLUS_HAUT', 'COURS_PLUS_BAS', 'COURS_OUVERTURE', 'COURS_VEILLE', 'VARIATION']
target_column = 'COURS_CLOTURE'

# Prepare training data
X = df[feature_columns].values
y = df[target_column].values

# Train the Linear Regression model with specified parameters
model = LinearRegression(
    copy_X=True,
    fit_intercept=True,
    n_jobs=None,
    positive=False
)

print("Training model...")
model.fit(X, y)
print(f"Model trained successfully!")
print(f"Model coefficients: {model.coef_}")
print(f"Model intercept: {model.intercept_}")
print(f"Training R² score: {model.score(X, y):.4f}")

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model': 'Linear Regression',
        'features': feature_columns,
        'training_samples': len(X)
    })

@app.route('/predict', methods=['POST'])
def predict():
    """
    Predict MASI closing price
    Expected JSON input:
    {
        "date": "2023-12-08",
        "coursPlusHaut": 11885.32,
        "coursPlusBas": 11824.97,
        "coursOuverture": 11827.02,
        "coursVeille": 11827.02,
        "variation": 0.49
    }
    """
    try:
        data = request.json
        
        # Extract features in the correct order
        features = np.array([[
            float(data['coursPlusHaut']),
            float(data['coursPlusBas']),
            float(data['coursOuverture']),
            float(data['coursVeille']),
            float(data['variation'])
        ]])
        
        # Make prediction
        prediction = model.predict(features)[0]
        
        # Calculate confidence (using R² score as proxy)
        confidence = model.score(X, y)
        
        return jsonify({
            'predictedValue': float(prediction),
            'confidence': float(confidence),
            'timestamp': datetime.now().isoformat(),
            'model': 'Linear Regression',
            'parameters': {
                'copy_X': True,
                'fit_intercept': True,
                'n_jobs': None,
                'positive': False
            }
        })
    
    except Exception as e:
        return jsonify({
            'error': str(e),
            'message': 'Failed to generate prediction'
        }), 400

@app.route('/model-info', methods=['GET'])
def model_info():
    """Get model information"""
    return jsonify({
        'model_type': 'Linear Regression',
        'features': feature_columns,
        'target': target_column,
        'parameters': {
            'copy_X': True,
            'fit_intercept': True,
            'n_jobs': None,
            'positive': False
        },
        'coefficients': model.coef_.tolist(),
        'intercept': float(model.intercept_),
        'r2_score': float(model.score(X, y)),
        'training_samples': len(X)
    })

if __name__ == '__main__':
    print("\n" + "="*50)
    print("MASI Prediction API Server")
    print("="*50)
    print(f"Model: Linear Regression")
    print(f"Features: {', '.join(feature_columns)}")
    print(f"Target: {target_column}")
    print(f"Training samples: {len(X)}")
    print(f"R² Score: {model.score(X, y):.4f}")
    print("="*50 + "\n")
    app.run(debug=True, port=5001, host='0.0.0.0')
