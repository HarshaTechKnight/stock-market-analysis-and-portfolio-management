'use server';

/**
 * @fileOverview Provides real-time sentiment analysis for stocks based on news, social media, and financial data.
 *
 * - analyzeStockSentiment - A function that generates a sentiment analysis summary for a given stock.
 * - AnalyzeStockSentimentInput - The input type for the analyzeStockSentiment function.
 * - AnalyzeStockSentimentOutput - The return type for the analyzeStockSentiment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeStockSentimentInputSchema = z.object({
  ticker: z.string().describe('The ticker symbol of the stock to analyze.'),
  newsSummary: z.string().describe('A summary of recent news articles related to the stock.'),
  socialMediaSummary: z.string().describe('A summary of recent social media activity related to the stock.'),
  financialData: z.string().describe('Key financial data for the stock (e.g., price, volume, changes).'),
});
export type AnalyzeStockSentimentInput = z.infer<typeof AnalyzeStockSentimentInputSchema>;

const AnalyzeStockSentimentOutputSchema = z.object({
  sentimentSummary: z.string().describe('A short sentiment analysis summary for the stock.'),
  sentimentScore: z.number().describe('A numerical score representing the overall sentiment (e.g., -1 to 1).'),
  sentimentRanking: z.string().describe('A ranking of the sentiment (e.g., positive, neutral, negative).'),
});
export type AnalyzeStockSentimentOutput = z.infer<typeof AnalyzeStockSentimentOutputSchema>;

export async function analyzeStockSentiment(input: AnalyzeStockSentimentInput): Promise<AnalyzeStockSentimentOutput> {
  return analyzeStockSentimentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeStockSentimentPrompt',
  input: {schema: AnalyzeStockSentimentInputSchema},
  output: {schema: AnalyzeStockSentimentOutputSchema},
  prompt: `You are an AI assistant specializing in stock market sentiment analysis.

  Given the following information about a stock, generate a short sentiment analysis summary, assign a numerical sentiment score, and provide a sentiment ranking.

  Ticker Symbol: {{{ticker}}}
  News Summary: {{{newsSummary}}}
  Social Media Summary: {{{socialMediaSummary}}}
  Financial Data: {{{financialData}}}

  Consider the news, social media, and financial data to determine the overall sentiment towards the stock.

  The sentiment score should be a number between -1 and 1, where -1 is extremely negative, 0 is neutral, and 1 is extremely positive.
  The sentiment ranking should be one of the following: "positive", "neutral", or "negative".

  Output in JSON format.
  `,
});

const analyzeStockSentimentFlow = ai.defineFlow(
  {
    name: 'analyzeStockSentimentFlow',
    inputSchema: AnalyzeStockSentimentInputSchema,
    outputSchema: AnalyzeStockSentimentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
