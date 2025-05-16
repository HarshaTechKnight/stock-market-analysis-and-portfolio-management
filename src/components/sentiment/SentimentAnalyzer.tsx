"use client";

import { useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, AlertTriangle } from 'lucide-react';
import { analyzeStockSentiment } from '@/ai/flows/analyze-stock-sentiment';
import type { AnalyzeStockSentimentInput, AnalyzeStockSentimentOutput } from '@/ai/flows/analyze-stock-sentiment';
import SentimentResultDisplay from './SentimentResultDisplay';

const formSchema = z.object({
  ticker: z.string().min(1, { message: 'Ticker symbol is required.' }).max(10, { message: 'Ticker symbol must be 10 characters or less.'}),
  newsSummary: z.string().min(10, { message: 'News summary must be at least 10 characters.' }).max(2000, { message: 'News summary must be 2000 characters or less.'}),
  socialMediaSummary: z.string().min(10, { message: 'Social media summary must be at least 10 characters.' }).max(2000, { message: 'Social media summary must be 2000 characters or less.'}),
  financialData: z.string().min(10, { message: 'Financial data must be at least 10 characters.' }).max(2000, { message: 'Financial data must be 2000 characters or less.'}),
});

export default function SentimentAnalyzer() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalyzeStockSentimentOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ticker: '',
      newsSummary: '',
      socialMediaSummary: '',
      financialData: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const input: AnalyzeStockSentimentInput = values;
      const analysisResult = await analyzeStockSentiment(input);
      setResult(analysisResult);
    } catch (err) {
      console.error("Sentiment analysis error:", err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">AI Stock Sentiment Analyzer</CardTitle>
        <CardDescription>
          Enter stock details to get an AI-powered sentiment analysis.
          Provide summaries of news, social media trends, and key financial data.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="ticker"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock Ticker Symbol</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., AAPL, MSFT" {...field} className="bg-card" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newsSummary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>News Summary</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Summarize recent news articles related to the stock."
                      className="resize-y min-h-[100px] bg-card"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="socialMediaSummary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Social Media Summary</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Summarize recent social media sentiment and trends for the stock."
                      className="resize-y min-h-[100px] bg-card"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="financialData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key Financial Data</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide key financial data points (e.g., recent earnings, price movements, P/E ratio)."
                      className="resize-y min-h-[100px] bg-card"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Analyze Sentiment'
              )}
            </Button>
          </form>
        </Form>

        {error && (
          <div className="mt-6 p-4 bg-destructive/10 border border-destructive/50 text-destructive rounded-md flex items-start">
            <AlertTriangle className="h-5 w-5 mr-3 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-semibold">Analysis Failed</h4>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {result && !error && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Sentiment Analysis Result</h3>
            <SentimentResultDisplay result={result} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
