
import StockCard from '@/components/stocks/StockCard';
import type { Stock } from '@/types';
import { Input } from '@/components/ui/input';
import { Search, AlertTriangle } from 'lucide-react';

const mockStocks: Stock[] = [
  {
    symbol: "MOCK1",
    name: "Mock Stock One",
    price: 150.75,
    change: 2.50,
    changePercent: 0.0168,
    volume: 1200000,
    high: 152.00,
    low: 149.50,
    open: 150.00,
    previousClose: 148.25,
    marketCap: 250000000000,
    fiftyTwoWeekHigh: 180.00,
    fiftyTwoWeekLow: 120.00,
  },
  {
    symbol: "MOCK2",
    name: "Mock Stock Two",
    price: 75.20,
    change: -1.10,
    changePercent: -0.0144,
    volume: 850000,
    high: 76.00,
    low: 75.00,
    open: 75.80,
    previousClose: 76.30,
    marketCap: 120000000000,
    fiftyTwoWeekHigh: 90.00,
    fiftyTwoWeekLow: 60.00,
  },
  {
    symbol: "MOCK3",
    name: "Mock Services Inc.",
    price: 280.45,
    change: 5.15,
    changePercent: 0.0187,
    volume: 950000,
    high: 282.00,
    low: 278.50,
    open: 279.00,
    previousClose: 275.30,
    marketCap: 450000000000,
    fiftyTwoWeekHigh: 300.00,
    fiftyTwoWeekLow: 220.00,
  },
  {
    symbol: "MOCK4",
    name: "Fictional Goods Co.",
    price: 45.60,
    change: 0.25,
    changePercent: 0.0055,
    volume: 600000,
    high: 46.00,
    low: 45.20,
    open: 45.50,
    previousClose: 45.35,
    marketCap: 50000000000,
    fiftyTwoWeekHigh: 55.00,
    fiftyTwoWeekLow: 35.00,
  },
    {
    symbol: "MOCK5",
    name: "Placeholder Industries",
    price: 12.34,
    change: -0.02,
    changePercent: -0.0016,
    volume: 300000,
    high: 12.50,
    low: 12.20,
    open: 12.36,
    previousClose: 12.36,
    marketCap: 10000000000,
    fiftyTwoWeekHigh: 20.00,
    fiftyTwoWeekLow: 10.00,
  },
  {
    symbol: "MOCK6",
    name: "Sample Corp Ltd.",
    price: 99.99,
    change: 1.01,
    changePercent: 0.0102,
    volume: 750000,
    high: 100.50,
    low: 98.90,
    open: 99.00,
    previousClose: 98.98,
    marketCap: 80000000000,
    fiftyTwoWeekHigh: 110.00,
    fiftyTwoWeekLow: 85.00,
  }
];

export default function TickerPage() {
  const stocks: Stock[] = mockStocks;

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
            // Search functionality is not implemented with mock data
          />
        </div>
      </div>
      <p className="text-muted-foreground">
        Displaying sample stock prices, changes, and key metrics. Data is for demonstration purposes.
      </p>

      {stocks.length === 0 && (
         <div className="mt-6 p-4 bg-card border border-border text-muted-foreground rounded-md flex flex-col items-center justify-center">
            <AlertTriangle className="h-8 w-8 mb-2" />
            <h4 className="font-semibold">No Stock Data Available</h4>
            <p className="text-sm">There is no mock stock data to display at this time.</p>
          </div>
      )}

      {stocks.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stocks.map((stock, index) => (
            <StockCard key={`${stock.symbol}-${index}`} stock={stock} />
          ))}
        </div>
      )}
    </div>
  );
}
