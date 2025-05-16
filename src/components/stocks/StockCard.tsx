import type { Stock } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StockCardProps {
  stock: Stock;
}

export default function StockCard({ stock }: StockCardProps) {
  const isPositiveChange = stock.change >= 0;

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold text-primary">{stock.symbol}</CardTitle>
            <CardDescription className="text-sm">{stock.name}</CardDescription>
          </div>
          <div className={cn(
            "flex items-center text-sm font-semibold",
            isPositiveChange ? "text-green-500" : "text-red-500"
          )}>
            {isPositiveChange ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
            {stock.changePercent.toFixed(2)}%
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-2">${stock.price.toFixed(2)}</div>
        <div className="text-xs text-muted-foreground mb-3">
          Change: <span className={cn(isPositiveChange ? "text-green-500" : "text-red-500")}>
            {isPositiveChange ? '+' : ''}{stock.change.toFixed(2)}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
          <div><span className="text-muted-foreground">Volume:</span> {stock.volume.toLocaleString()}</div>
          <div><span className="text-muted-foreground">Open:</span> ${stock.open?.toFixed(2) ?? 'N/A'}</div>
          <div><span className="text-muted-foreground">High:</span> ${stock.high.toFixed(2)}</div>
          <div><span className="text-muted-foreground">Low:</span> ${stock.low.toFixed(2)}</div>
          {stock.marketCap && <div><span className="text-muted-foreground">Market Cap:</span> ${(stock.marketCap / 1e9).toFixed(2)}B</div>}
          {stock.previousClose && <div><span className="text-muted-foreground">Prev. Close:</span> ${stock.previousClose.toFixed(2)}</div>}
        </div>
      </CardContent>
    </Card>
  );
}
