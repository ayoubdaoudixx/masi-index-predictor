/**
 * Prediction Service for MASI Index
 * Uses Linear Regression model with parameters:
 * - copy_x: True
 * - fit_intercept: True
 * - n_jobs: None
 * - positive: False
 */

export interface PredictionInput {
  date: string; // Format: YYYY-MM-DD
  coursPlusHaut: number; // Highest price
  coursPlusBas: number; // Lowest price
  coursOuverture: number; // Opening price
  coursVeille: number; // Previous closing price
  variation: number; // Percentage change
}

export interface PredictionResult {
  predictedValue: number;
  confidence?: number;
  timestamp: string;
}

/**
 * Make prediction using the trained Linear Regression model
 * Connects to Flask backend API
 */
export const predictMASI = async (
  input: PredictionInput
): Promise<PredictionResult> => {
  try {
    const API_URL = 'http://localhost:5001/predict';
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Prediction failed');
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Prediction error:', error);
    
    // Fallback to mock prediction if API is not available
    console.warn('API not available, using fallback prediction');
    const mockPrediction = calculateMockPrediction(input);
    
    return {
      predictedValue: mockPrediction,
      timestamp: new Date().toISOString(),
    };
  }
};

/**
 * Mock prediction function - REPLACE THIS
 * This is a placeholder until you connect your actual trained model
 */
const calculateMockPrediction = (input: PredictionInput): number => {
  // Simple weighted average as placeholder
  // Your actual model will use the trained Linear Regression coefficients
  const {
    coursPlusHaut,
    coursPlusBas,
    coursOuverture,
    coursVeille,
    variation,
  } = input;

  // Placeholder calculation - NOT the actual model
  const avgPrice = (coursPlusHaut + coursPlusBas + coursOuverture + coursVeille) / 4;
  const adjustedPrice = avgPrice * (1 + variation / 100);
  
  return Number(adjustedPrice.toFixed(2));
};

/**
 * Validate input data before sending to model
 */
export const validatePredictionInput = (
  input: PredictionInput
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (input.coursPlusHaut <= 0) {
    errors.push('Highest price must be positive');
  }
  if (input.coursPlusBas <= 0) {
    errors.push('Lowest price must be positive');
  }
  if (input.coursOuverture <= 0) {
    errors.push('Opening price must be positive');
  }
  if (input.coursVeille <= 0) {
    errors.push('Previous closing price must be positive');
  }
  if (input.coursPlusBas > input.coursPlusHaut) {
    errors.push('Lowest price cannot be higher than highest price');
  }


  return {
    valid: errors.length === 0,
    errors,
  };
};
