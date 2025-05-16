"use client";

import { usePortfolio } from '@/hooks/usePortfolio';
import AddStockForm from './AddStockForm';
import PortfolioTable from './PortfolioTable';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { PortfolioStock } from '@/types';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';


const editStockFormSchema = z.object({
  id: z.string(),
  symbol: z.string().min(1, 'Symbol is required').max(10, 'Symbol max 10 chars').toUpperCase(),
  name: z.string().min(1, 'Name is required').max(100, 'Name max 100 chars'),
  shares: z.coerce.number().positive('Shares must be positive'),
  purchasePrice: z.coerce.number().positive('Purchase price must be positive'),
  purchaseDate: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format"
  }),
});

type EditStockFormValues = z.infer<typeof editStockFormSchema>;


export default function PortfolioManager() {
  const { portfolio, addStock, removeStock, updateStock, isLoaded } = usePortfolio();
  const [editingStock, setEditingStock] = useState<PortfolioStock | null>(null);
  const { toast } = useToast();

  const form = useForm<EditStockFormValues>({
    resolver: zodResolver(editStockFormSchema),
  });
  
  useEffect(() => {
    if (editingStock) {
      form.reset({
        ...editingStock,
        purchaseDate: new Date(editingStock.purchaseDate).toISOString().split('T')[0],
      });
    }
  }, [editingStock, form]);

  const handleEditStock = (stock: PortfolioStock) => {
    setEditingStock(stock);
  };

  const handleUpdateStock = (values: EditStockFormValues) => {
    updateStock({
      ...values,
      purchaseDate: new Date(values.purchaseDate).toISOString(), // Ensure ISO format
    });
    toast({
      title: "Stock Updated",
      description: `${values.name} (${values.symbol}) has been updated.`,
    });
    setEditingStock(null);
  };


  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2 text-muted-foreground">Loading portfolio...</p>
      </div>
    );
  }
  
  // Calculate total portfolio value (mock)
  const totalPortfolioValue = portfolio.reduce((acc, stock) => {
    const currentPrice = (stock.symbol === 'AAPL' ? 170 : stock.symbol === 'MSFT' ? 420 : 100) + Math.random() * 20 - 10; // Mock price
    return acc + (stock.shares * currentPrice);
  }, 0);

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">My Personal Portfolio</CardTitle>
          <CardDescription>
            Track your stock investments, monitor performance, and manage your holdings.
            Current total portfolio value (illustrative): <span className="font-semibold text-primary">${totalPortfolioValue.toFixed(2)}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddStockForm onAddStock={addStock} />
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Current Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <PortfolioTable stocks={portfolio} onRemoveStock={removeStock} onEditStock={handleEditStock} />
        </CardContent>
      </Card>

      {editingStock && (
        <Dialog open={!!editingStock} onOpenChange={(isOpen) => !isOpen && setEditingStock(null)}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Edit Stock: {editingStock.symbol}</DialogTitle>
              <DialogDescription>
                Update the details for your stock holding.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleUpdateStock)} className="space-y-4 py-4">
                <FormField control={form.control} name="id" render={({ field }) => <Input type="hidden" {...field} />} />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="symbol"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Symbol</FormLabel>
                        <FormControl><Input {...field} className="bg-background" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl><Input {...field} className="bg-background" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                   <FormField
                    control={form.control}
                    name="shares"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Shares</FormLabel>
                        <FormControl><Input type="number" step="any" {...field} className="bg-background" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="purchasePrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Purchase Price</FormLabel>
                        <FormControl><Input type="number" step="any" {...field} className="bg-background" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="purchaseDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Purchase Date</FormLabel>
                        <FormControl><Input type="date" {...field} className="bg-background" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Save Changes</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
