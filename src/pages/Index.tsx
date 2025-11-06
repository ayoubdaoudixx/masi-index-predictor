import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, LineChart, Target } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background">
      <div className="container mx-auto px-4 py-20">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4" />
            AI-Powered Market Analysis
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
            Market Prediction Platform
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Advanced algorithms analyzing trading patterns to deliver accurate market predictions
          </p>
          
          <Link to="/predict">
            <Button 
              size="lg" 
              className="h-14 px-8 text-lg font-semibold bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity shadow-glow"
            >
              Start Predicting
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border p-8 hover:shadow-soft transition-all duration-300">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
              <LineChart className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Real-Time Analysis</h3>
            <p className="text-muted-foreground">
              Process live market data to generate instant predictions with high accuracy
            </p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border p-8 hover:shadow-soft transition-all duration-300">
            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Precise Forecasting</h3>
            <p className="text-muted-foreground">
              Advanced machine learning models trained on historical trading patterns
            </p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border p-8 hover:shadow-soft transition-all duration-300">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Market Insights</h3>
            <p className="text-muted-foreground">
              Comprehensive analysis of price movements and trading session trends
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
