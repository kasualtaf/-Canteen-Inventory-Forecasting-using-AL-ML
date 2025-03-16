export interface PredictionRequest {
  features: number[];
}

export interface PredictionResponse {
  status: string;
  prediction: number;
}

export interface PredictionHistory {
  features: number[];
  prediction: number;
  timestamp: Date;
} 