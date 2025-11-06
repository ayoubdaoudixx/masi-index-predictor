import { TrendingUp, LineChart, Target, BarChart3 } from "lucide-react";

const Overview = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Platform Overview
            </h1>
            <p className="text-muted-foreground text-lg">
              Understanding the MASI Prediction Engine
            </p>
          </div>

          {/* Features */}
          <div className="space-y-8">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">MASI Index Prediction</h3>
                  <p className="text-muted-foreground">
                    Our platform specializes in predicting the Moroccan All Shares Index (MASI) using advanced machine learning algorithms trained on historical market data.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <LineChart className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Data-Driven Analysis</h3>
                  <p className="text-muted-foreground">
                    Input key trading session metrics including opening price, highest and lowest prices, previous closing price, and percentage variation to generate accurate predictions.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Accurate Forecasting</h3>
                  <p className="text-muted-foreground">
                    Our models are continuously refined to provide reliable predictions that help investors make informed decisions about the Moroccan stock market.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">User-Friendly Interface</h3>
                  <p className="text-muted-foreground">
                    Simple and intuitive form-based interface makes it easy to input trading data and receive instant predictions without requiring technical expertise.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
