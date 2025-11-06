# MASI Prediction Backend API

Flask API server for MASI Index predictions using Linear Regression.

## Setup

1. Create a virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the server:
```bash
python app.py
```

The API will be available at `http://localhost:5000`

## API Endpoints

### POST /predict
Predict MASI closing price

**Request Body:**
```json
{
  "date": "2023-12-08",
  "coursPlusHaut": 11885.32,
  "coursPlusBas": 11824.97,
  "coursOuverture": 11827.02,
  "coursVeille": 11827.02,
  "variation": 0.49
}
```

**Response:**
```json
{
  "predictedValue": 11885.32,
  "confidence": 0.9998,
  "timestamp": "2023-12-08T10:30:00",
  "model": "Linear Regression"
}
```

### GET /health
Health check endpoint

### GET /model-info
Get model information and statistics
