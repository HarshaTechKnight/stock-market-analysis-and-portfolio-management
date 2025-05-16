"use client";

import type { PortfolioStock } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2, Edit3 } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from '@/hooks/use-toast';

interface PortfolioTableProps {
  stocks: PortfolioStock[];
  onRemoveStock: (stockId: string) => void;
  onEditStock: (stock: PortfolioStock) => void; // Placeholder for edit functionality
}

// Mock function to get current price - replace with actual API call in a real app
const getCurrentPrice = (symbol: string): number => {
  // Simple mock: slightly vary purchase price
  const hash = symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const variation = (hash % 2000 - 1000) / 100; // +/- 10.00
  const basePrice = symbol === 'AAPL' ? 170 : symbol === 'MSFT' ? 420 : 100; // Example base prices
  return Math.max(10, basePrice + variation); // Ensure price is not negative
};

export default function PortfolioTable({ stocks, onRemoveStock, onEditStock }: PortfolioTableProps) {
  const { toast } = useToast();

  if (stocks.length === 0) {
    return <p className="text-center text-muted-foreground py-8">Your portfolio is empty. Add some stocks to get started!</p>;
  }

  const handleRemove = (stock: PortfolioStock) => {
    onRemoveStock(stock.id);
    toast({
      title: "Stock Removed",
      description: `${stock.name} (${stock.symbol}) has been removed from your portfolio.`,
      variant: "destructive"
    });
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>Your current stock holdings. Current prices are illustrative.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Symbol</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Shares</TableHead>
            <TableHead className="text-right">Purchase Price</TableHead>
            <TableHead className="text-right">Purchase Date</TableHead>
            <TableHead className="text-right">Current Price*</TableHead>
            <TableHead className="text-right">Total Value</TableHead>
            <TableHead className="text-right">Gain/Loss</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stocks.map((stock) => {
            const currentPrice = getCurrentPrice(stock.symbol);
            const totalValue = stock.shares * currentPrice;
            const purchaseValue = stock.shares * stock.purchasePrice;
            const gainLoss = totalValue - purchaseValue;
            const isGain = gainLoss >= 0;

            return (
              <TableRow key={stock.id}>
                <TableCell className="font-medium text-primary">{stock.symbol}</TableCell>
                <TableCell>{stock.name}</TableCell>
                <TableCell className="text-right">{stock.shares}</TableCell>
                <TableCell className="text-right">${stock.purchasePrice.toFixed(2)}</TableCell>
                <TableCell className="text-right">{format(new Date(stock.purchaseDate), 'MMM dd, yyyy')}</TableCell>
                <TableCell className="text-right">${currentPrice.toFixed(2)}</TableCell>
                <TableCell className="text-right font-semibold">${totalValue.toFixed(2)}</TableCell>
                <TableCell className={cn("text-right font-semibold", isGain ? 'text-green-500' : 'text-red-500')}>
                  {isGain ? '+' : ''}${gainLoss.toFixed(2)}
                </TableCell>
                <TableCell className="text-center space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => onEditStock(stock)} aria-label="Edit stock" className="hover:text-primary">
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" aria-label="Remove stock" className="hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action will permanently remove {stock.name} ({stock.symbol}) from your portfolio.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleRemove(stock)} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                          Remove
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
