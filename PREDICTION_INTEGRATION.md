# MASI Prediction Model Integration Guide

## Current Status
✅ Frontend prediction interface is complete and functional
⚠️ Using placeholder prediction logic - needs to be replaced with your trained model

## Your Model Specifications
- **Algorithm**: Linear Regression
- **Parameters**:
  - `copy_x`: True
  - `fit_intercept`: True
  - `n_jobs`: None
  - `positive`: False

## Next Steps to Integrate Your Model

### Option 1: Backend API (Recommended)

Create a Python Flask/FastAPI backend to serve your model:

```python
# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load your trained model
model = joblib.load('path/to/your/model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    
    # Prepare features in the same order as training
    features = pd.DataFrame([{
        'date': data['date'],
        'coursPlusHaut': data['coursPlusHaut'],
        'coursPlusBas': data['coursPlusBas'],
        'coursOuverture': data['coursOuverture'],
        'coursVeille': data['coursVeille'],
        'variation': data['variation']
    }])
    
    # Apply any preprocessing (scaling, encoding, etc.)
    # features = scaler.transform(features)  # if you used scaling
    
    # Make prediction
    prediction = model.predict(features)[0]
    
    return jsonify({
        'predictedValue': float(prediction),
        'timestamp': pd.Timestamp.now().isoformat()
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
```

Then update `src/services/predictionService.ts`:
```typescript
export const predictMASI = async (input: PredictionInput): Promise<PredictionResult> => {
  const response = await fetch('http://localhost:5000/predict', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input)
  });
  
  if (!response.ok) {
    throw new Error('Prediction failed');
  }
  
  return await response.json();
};
```

### Option 2: Export Model to JavaScript

Use libraries like `sklearn-porter` or `onnx` to convert your model to JavaScript.

### Option 3: Serverless Function

Deploy your model as a serverless function (AWS Lambda, Google Cloud Functions, Vercel).

## Required Information

Please provide:

1. **Dataset**: Your training data CSV file
2. **Feature Engineering**: Any transformations applied to features
3. **Preprocessing**: Scaling, normalization, encoding steps
4. **Model File**: Your saved model (.pkl, .joblib)
5. **Feature Order**: Exact order of features used in training
6. **Target Variable**: What the model predicts (closing price, index value, etc.)

## Files to Update

Once you provide the dataset and model details:

1. ✅ `src/services/predictionService.ts` - Already created (needs actual API endpoint)
2. ✅ `src/pages/Predict.tsx` - Already updated with prediction display
3. ⚠️ Backend API - Needs to be created
4. ⚠️ Model deployment - Needs configuration

## Testing

After integration, test with sample data from your dataset to verify predictions match your notebook results.
