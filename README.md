# MASI Predictor

A modern web application for predicting MASI (Moroccan All Shares Index) closing prices using machine learning. This full-stack application combines a React frontend with a Flask backend to deliver accurate market predictions based on historical trading data.

## 📊 Project Overview

The MASI Predictor is an intelligent forecasting tool designed to predict the closing price of the MASI Index based on key trading session parameters. The application leverages machine learning to analyze historical market data and generate predictions with confidence scores.

### Key Features

- **Real-time Predictions**: Generate instant MASI closing price predictions
- **Interactive Form**: User-friendly interface for entering trading session data
- **Confidence Scoring**: Each prediction includes a confidence metric based on model performance
- **Responsive Design**: Modern, mobile-friendly UI built with React and Tailwind CSS
- **RESTful API**: Flask backend serving predictions via REST endpoints

## 🤖 Machine Learning Model

### Model Type
**Linear Regression** with the following parameters:
- `fit_intercept=True`
- `copy_X=True`
- `n_jobs=None`
- `positive=False`

### Features Used
The model uses 5 key features to predict the closing price:
1. **COURS_PLUS_HAUT** (Highest Price) - Session high price
2. **COURS_PLUS_BAS** (Lowest Price) - Session low price
3. **COURS_OUVERTURE** (Opening Price) - Session opening price
4. **COURS_VEILLE** (Previous Close) - Previous day's closing price
5. **VARIATION** (Percentage Change) - Percentage change for the session

### Target Variable
- **COURS_CLOTURE** (Closing Price) - The predicted MASI closing price

### Model Performance
The model is trained on historical MASI trading data and provides an R² score indicating prediction accuracy. The confidence score is displayed with each prediction.

## 📁 Dataset

### Dataset Type
- **Format**: Excel file (.xlsx)
- **Location**: `src/Data/Dataset.xlsx`
- **Source**: Historical MASI Index trading data

### Dataset Structure
The dataset contains the following columns:
- `SEANCE` - Trading session date and time
- `INDICE` - Index identifier
- `COURS_PLUS_HAUT` - Highest price during the session
- `COURS_PLUS_BAS` - Lowest price during the session
- `COURS_OUVERTURE` - Opening price
- `COURS_VEILLE` - Previous day's closing price
- `VARIATION` - Percentage change
- `COURS_CLOTURE` - Closing price (target variable)

### Data Preprocessing
- Date conversion from string format to datetime
- Removal of non-essential columns
- Feature extraction for model training

## 🛠️ Technologies Used

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI component library
- **React Hook Form** - Form validation and management
- **Zod** - Schema validation
- **React Router** - Client-side routing
- **Lucide React** - Icon library
- **date-fns** - Date manipulation

### Backend
- **Flask 3.0.0** - Python web framework
- **Flask-CORS** - Cross-origin resource sharing
- **scikit-learn 1.3.2** - Machine learning library
- **pandas 2.1.4** - Data manipulation
- **numpy 1.26.2** - Numerical computing
- **openpyxl 3.1.2** - Excel file handling

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher) and npm - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- **Python** (v3.8 or higher)
- **pip** - Python package manager

### Installation Steps

#### 1. Clone the Repository
```bash
git clone <YOUR_GIT_URL>
cd stock-spark-form
```

#### 2. Install Frontend Dependencies
```bash
npm install
```

#### 3. Install Backend Dependencies
```bash
cd backend
pip install -r requirements.txt
cd ..
```

#### 4. Start the Backend Server
```bash
cd backend
python app.py
```
The Flask server will start on `http://localhost:5001`

#### 5. Start the Frontend Development Server
Open a new terminal window:
```bash
npm run dev
```
The React app will start on `http://localhost:5173`

#### 6. Access the Application
Open your browser and navigate to `http://localhost:5173`

## 📖 Usage

1. **Navigate to the Predict page** from the main navigation
2. **Enter trading session data**:
   - Select the prediction date
   - Enter opening price
   - Enter previous day's closing price
   - Enter highest price for the session
   - Enter lowest price for the session
   - Enter percentage change (can be negative)
3. **Click "Generate Prediction"** to get the predicted MASI closing price
4. **View the result** with confidence score and timestamp
5. **Click "Predict Again"** to reset the form and make another prediction

## 🏗️ Project Structure

```
stock-spark-form/
├── backend/
│   ├── app.py              # Flask API server
│   └── requirements.txt    # Python dependencies
├── src/
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── services/          # API services
│   ├── Data/              # Dataset files
│   └── ...
├── public/                # Static assets
├── package.json           # Node dependencies
└── README.md             # This file
```

## 🔌 API Endpoints

### Health Check
```
GET /health
```
Returns server status and model information

### Predict
```
POST /predict
Content-Type: application/json

{
  "date": "2023-12-08",
  "coursPlusHaut": 11885.32,
  "coursPlusBas": 11824.97,
  "coursOuverture": 11827.02,
  "coursVeille": 11827.02,
  "variation": 0.49
}
```
Returns predicted MASI closing price with confidence score

### Model Info
```
GET /model-info
```
Returns detailed model information, coefficients, and performance metrics

## 📝 Development

### Build for Production
```bash
npm run build
```

### Run Linter
```bash
npm run lint
```

### Preview Production Build
```bash
npm run preview
```

## 👨‍💻 Author

**Ayoub Daoudi**
- Email: ayoubdaoudi2001@gmail.com
- Phone: +212 717 270 056
- GitHub: [@ayoubdaoudixx](https://github.com/ayoubdaoudixx)
- LinkedIn: [ayoubdaoudi](https://linkedin.com/in/ayoubdaoudi)
- Twitter: [@ayoubdaoudixx](https://twitter.com/ayoubdaoudixx)

## 📄 License

© 2024 MASI Predictor. All rights reserved.
