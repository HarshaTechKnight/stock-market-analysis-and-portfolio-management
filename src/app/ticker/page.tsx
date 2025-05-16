import StockCard from '@/components/stocks/StockCard';
import type { Stock } from '@/types';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

// Mock stock data
const mockStocks: Stock[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 170.34, change: 1.23, changePercent: 0.72, volume: 85000000, high: 171.00, low: 169.50, open: 170.00, marketCap: 2700000000000, previousClose: 169.11, fiftyTwoWeekHigh: 199.62, fiftyTwoWeekLow: 164.08 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 420.72, change: -0.50, changePercent: -0.12, volume: 22000000, high: 421.50, low: 419.80, open: 420.50, marketCap: 3120000000000, previousClose: 421.22, fiftyTwoWeekHigh: 430.82, fiftyTwoWeekLow: 289.30 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 175.66, change: 2.10, changePercent: 1.21, volume: 18000000, high: 176.00, low: 173.80, open: 174.00, marketCap: 2180000000000, previousClose: 173.56, fiftyTwoWeekHigh: 179.54, fiftyTwoWeekLow: 116.66 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 183.63, change: -1.15, changePercent: -0.62, volume: 45000000, high: 185.00, low: 183.20, open: 184.50, marketCap: 1900000000000, previousClose: 184.78, fiftyTwoWeekHigh: 191.70, fiftyTwoWeekLow: 118.35 },
  { symbol: 'TSLA', name: 'Tesla, Inc.', price: 177.46, change: 3.45, changePercent: 1.98, volume: 95000000, high: 178.50, low: 175.00, open: 176.00, marketCap: 560000000000, previousClose: 174.01, fiftyTwoWeekHigh: 299.29, fiftyTwoWeekLow: 138.80 },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 120.80, change: -2.01, changePercent: -1.65, volume: 150000000, high: 123.00, low: 120.50, open: 122.50, marketCap: 2980000000000, previousClose: 122.81, fiftyTwoWeekHigh: 140.76, fiftyTwoWeekLow: 39.23 },
];

// TODO: Implement actual search/filter functionality if desired.
// For now, this is a placeholder page structure.
export default function TickerPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold">Stock Ticker</h1>
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search stocks..."
            className="pl-10 w-full sm:w-64 md:w-80 bg-card"
            // Add onChange and value for actual search functionality
          />
        </div>
      </div>
      <p className="text-muted-foreground">
        Displaying real-time* stock prices, changes, and key metrics. (*Data is currently mock data for demonstration.)
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockStocks.map((stock) => (
          <StockCard key={stock.symbol} stock={stock} />
        ))}
      </div>
    </div>
  );
}
