import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, TrendingUp, AlertCircle, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { predictMASI, validatePredictionInput, PredictionResult } from "@/services/predictionService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const predictionSchema = z.object({
  date: z.date({
    required_error: "Date of prediction is required.",
  }),
  coursPlusHaut: z.string().min(1, "Highest price is required").refine(
    (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
    { message: "Must be a valid positive number" }
  ),
  coursPlusBas: z.string().min(1, "Lowest price is required").refine(
    (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
    { message: "Must be a valid positive number" }
  ),
  coursOuverture: z.string().min(1, "Opening price is required").refine(
    (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
    { message: "Must be a valid positive number" }
  ),
  coursVeille: z.string().min(1, "Previous closing price is required").refine(
    (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
    { message: "Must be a valid positive number" }
  ),
  variation: z.string().min(1, "Percentage change is required").refine(
    (val) => !isNaN(parseFloat(val)),
    { message: "Must be a valid number" }
  ),
});

type PredictionFormValues = z.infer<typeof predictionSchema>;

const Predict = () => {
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<PredictionFormValues>({
    resolver: zodResolver(predictionSchema),
  });

  const onSubmit = async (data: PredictionFormValues) => {
    setIsLoading(true);
    setError(null);
    setPredictionResult(null);

    const formattedData = {
      date: format(data.date, "yyyy-MM-dd"),
      coursPlusHaut: parseFloat(data.coursPlusHaut),
      coursPlusBas: parseFloat(data.coursPlusBas),
      coursOuverture: parseFloat(data.coursOuverture),
      coursVeille: parseFloat(data.coursVeille),
      variation: parseFloat(data.variation),
    };

    // Validate input
    const validation = validatePredictionInput(formattedData);
    if (!validation.valid) {
      setError(validation.errors.join(", "));
      setIsLoading(false);
      return;
    }

    try {
      const result = await predictMASI(formattedData);
      setPredictionResult(result);
      toast({
        title: "Prediction Generated",
        description: "Your MASI prediction has been calculated successfully.",
      });
    } catch (err) {
      setError("Failed to generate prediction. Please try again.");
      toast({
        title: "Prediction Failed",
        description: "An error occurred while generating the prediction.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Market Prediction
            </h1>
            <p className="text-muted-foreground text-lg">
              Enter trading session data to generate accurate predictions
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border p-8 shadow-soft">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Date Field */}
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-base font-semibold">Date of Prediction</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal h-12",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Select the date for which you want to generate a prediction
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Price Fields Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="coursOuverture"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">Opening Price</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="0.00"
                            type="number"
                            step="0.01"
                            className="h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Session start price
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="coursVeille"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">Previous Close</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="0.00"
                            type="number"
                            step="0.01"
                            className="h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Previous day closing
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="coursPlusHaut"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">Highest Price</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="0.00"
                            type="number"
                            step="0.01"
                            className="h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Session high price
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="coursPlusBas"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">Lowest Price</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="0.00"
                            type="number"
                            step="0.01"
                            className="h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Session low price
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Variation Field */}
                <FormField
                  control={form.control}
                  name="variation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">Percentage Change</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="0.00"
                          type="number"
                          step="0.01"
                          className="h-12"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Percentage change for the trading session (can be negative)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isLoading ? "Generating..." : "Generate Prediction"}
                </Button>
              </form>
            </Form>
          </div>

          {/* Prediction Result */}
          {predictionResult && (
            <Card className="mt-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Prediction Result
                </CardTitle>
                <CardDescription>
                  Generated on {new Date(predictionResult.timestamp).toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Predicted MASI Index Value</p>
                  <p className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {predictionResult.predictedValue.toFixed(2)}
                  </p>
                  {predictionResult.confidence && (
                    <p className="text-sm text-muted-foreground mt-4">
                      Confidence: {(predictionResult.confidence * 100).toFixed(1)}%
                    </p>
                  )}
                  
                  {/* Refresh Button */}
                  <Button
                    onClick={() => {
                      setPredictionResult(null);
                      setError(null);
                      form.reset({
                        date: undefined,
                        coursPlusHaut: "",
                        coursPlusBas: "",
                        coursOuverture: "",
                        coursVeille: "",
                        variation: "",
                      });
                    }}
                    variant="outline"
                    className="mt-6"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Predict Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive" className="mt-8">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Info Note */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>All fields are required. Ensure accurate data entry for optimal predictions.</p>
            <p className="mt-2 text-xs">Model: Linear Regression (fit_intercept=True, copy_x=True)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Predict;
