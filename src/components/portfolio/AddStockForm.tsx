"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlusSquare } from 'lucide-react';
import type { PortfolioStock } from '@/types';
import { useToast } from "@/hooks/use-toast";


const formSchema = z.object({
  symbol: z.string().min(1, 'Symbol is required').max(10, 'Symbol max 10 chars').toUpperCase(),
  name: z.string().min(1, 'Name is required').max(100, 'Name max 100 chars'),
  shares: z.coerce.number().positive('Shares must be positive'),
  purchasePrice: z.coerce.number().positive('Purchase price must be positive'),
  purchaseDate: z.string().optional().refine(val => !val || !isNaN(Date.parse(val)), {
    message: "Invalid date format"
  }),
});

type AddStockFormValues = z.infer<typeof formSchema>;

interface AddStockFormProps {
  onAddStock: (stock: Omit<PortfolioStock, 'id'>) => void;
}

export default function AddStockForm({ onAddStock }: AddStockFormProps) {
  const { toast } = useToast();
  const form = useForm<AddStockFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symbol: '',
      name: '',
      shares: 0,
      purchasePrice: 0,
      purchaseDate: new Date().toISOString().split('T')[0], // Default to today
    },
  });

  function onSubmit(values: AddStockFormValues) {
    onAddStock({
      ...values,
      purchaseDate: values.purchaseDate || new Date().toISOString(),
    });
    toast({
      title: "Stock Added",
      description: `${values.shares} shares of ${values.symbol} added to your portfolio.`,
    });
    form.reset();
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <PlusSquare className="mr-2 h-6 w-6 text-primary" /> Add Stock to Portfolio
        </CardTitle>
        <CardDescription>Enter the details of the stock you want to track.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="symbol"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Symbol</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., AAPL" {...field} className="bg-background" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Apple Inc." {...field} className="bg-background" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="shares"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Shares</FormLabel>
                    <FormControl>
                      <Input type="number" step="any" placeholder="e.g., 10" {...field} className="bg-background" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="purchasePrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purchase Price (per share)</FormLabel>
                    <FormControl>
                      <Input type="number" step="any" placeholder="e.g., 150.75" {...field} className="bg-background" />
                    </FormControl>
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
                    <FormControl>
                      <Input type="date" {...field} className="bg-background" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full sm:w-auto">
              <PlusSquare className="mr-2 h-4 w-4" /> Add Stock
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
