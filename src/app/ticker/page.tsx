
import StockCard from '@/components/stocks/StockCard';
import type { Stock } from '@/types';
import { Input } from '@/components/ui/input';
import { Search, AlertTriangle, Loader2 } from 'lucide-react';
import { generateStockTickerData, type GenerateStockTickerDataInput } from '@/ai/flows/generate-stock-ticker-data-flow';

export default async function TickerPage() {
  let stocks: Stock[] = [];
  let error: string | null = null;
  let isLoading = true; // Start with loading true

  try {
    const input: GenerateStockTickerDataInput = { count: 6 };
    const result = await generateStockTickerData(input);
    stocks = result.stocks;
    if (!stocks || stocks.length === 0) {
        // This case might indicate an issue with AI generation even if no error was thrown
        error = "AI returned no stock data. Please try again later.";
    }
  } catch (err) {
    console.error("Failed to fetch AI-generated stock data:", err);
    error = err instanceof Error ? err.message : "An unexpected error occurred while fetching stock data.";
    stocks = []; // Ensure stocks is empty on error
  } finally {
    isLoading = false;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold">AI-Powered Stock Ticker</h1>
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search stocks..."
            className="pl-10 w-full sm:w-64 md:w-80 bg-card"
            // Search functionality is not implemented with AI data yet
          />
        </div>
      </div>
      <p className="text-muted-foreground">
        Displaying AI-generated stock prices, changes, and key metrics. Data is fictional and for demonstration purposes.
      </p>

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin mb-2 text-primary" />
          <p>Loading AI-generated stock data...</p>
        </div>
      )}

      {!isLoading && error && (
        <div className="mt-6 p-4 bg-destructive/10 border border-destructive/50 text-destructive rounded-md flex items-start">
          <AlertTriangle className="h-5 w-5 mr-3 mt-0.5 shrink-0" />
          <div>
            <h4 className="font-semibold">Failed to Load Stock Data</h4>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      {!isLoading && !error && stocks.length === 0 && (
         <div className="mt-6 p-4 bg-card border border-border text-muted-foreground rounded-md flex flex-col items-center justify-center">
            <AlertTriangle className="h-8 w-8 mb-2" />
            <h4 className="font-semibold">No Stock Data Available</h4>
            <p className="text-sm">The AI could not generate stock data at this time. Please try refreshing the page.</p>
          </div>
      )}

      {!isLoading && !error && stocks.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stocks.map((stock, index) => (
            <StockCard key={`${stock.symbol}-${index}`} stock={stock} />
          ))}
        </div>
      )}
    </div>
  );
}
