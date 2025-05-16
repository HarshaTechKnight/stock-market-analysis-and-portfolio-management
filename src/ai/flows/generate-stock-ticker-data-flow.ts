
'use server';
/**
 * @fileOverview Generates fictional stock ticker data using AI.
 *
 * - generateStockTickerData - A function that generates a list of stock ticker data.
 * - GenerateStockTickerDataInput - The input type for the generateStockTickerData function.
 * - GenerateStockTickerDataOutput - The return type for the generateStockTickerData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define a Zod schema that matches the Stock interface in src/types/index.ts
const StockFlowSchema = z.object({
  symbol: z.string().max(10).describe('Unique stock ticker symbol, e.g., "AIFINC". Max 10 chars, uppercase.'),
  name: z.string().describe('Full company name, e.g., "AI Financial Inc."'),
  price: z.number().positive().describe('Current trading price of the stock. Should be a positive number.'),
  change: z.number().describe('The change in price from the previous trading day (can be positive or negative).'),
  changePercent: z.number().describe('The percentage change in price (e.g., 0.05 for 5%, -0.02 for -2%).'),
  volume: z.number().int().positive().describe('The number of shares traded today. Should be a large positive integer.'),
  high: z.number().positive().describe('Today\'s highest trading price. Must be >= price and >= low.'),
  low: z.number().positive().describe('Today\'s lowest trading price. Must be <= price and <= high.'),
  marketCap: z.number().int().positive().optional().describe('Total market capitalization. Large positive integer.'),
  previousClose: z.number().positive().optional().describe('Previous day\'s closing price. Must be positive.'),
  open: z.number().positive().optional().describe('Today\'s opening price. Must be positive.'),
  fiftyTwoWeekHigh: z.number().positive().optional().describe('Highest price in the last 52 weeks. Must be >= price and high.'),
  fiftyTwoWeekLow: z.number().positive().optional().describe('Lowest price in the last 52 weeks. Must be <= price and low.'),
}).refine(data => data.high >= data.low, {
  message: "High price must be greater than or equal to low price.",
  path: ["high", "low"],
}).refine(data => !data.fiftyTwoWeekHigh || data.fiftyTwoWeekHigh >= data.price, {
  message: "52-week high must be greater than or equal to current price.",
  path: ["fiftyTwoWeekHigh"],
}).refine(data => !data.fiftyTwoWeekLow || data.fiftyTwoWeekLow <= data.price, {
  message: "52-week low must be less than or equal to current price.",
  path: ["fiftyTwoWeekLow"],
});


const GenerateStockTickerDataInputSchema = z.object({
  count: z.number().int().min(1).max(10).optional().default(6).describe("Number of stocks to generate (1-10)."),
});
export type GenerateStockTickerDataInput = z.infer<typeof GenerateStockTickerDataInputSchema>;

const GenerateStockTickerDataOutputSchema = z.object({
  stocks: z.array(StockFlowSchema).describe("An array of generated stock data."),
});
export type GenerateStockTickerDataOutput = z.infer<typeof GenerateStockTickerDataOutputSchema>;

export async function generateStockTickerData(input: GenerateStockTickerDataInput): Promise<GenerateStockTickerDataOutput> {
  return generateStockTickerDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateStockTickerDataPrompt',
  input: {schema: GenerateStockTickerDataInputSchema},
  output: {schema: GenerateStockTickerDataOutputSchema},
  prompt: `You are a financial data simulator. Generate a list of {{{count}}} diverse fictional stock tickers with plausible, realistic-looking data.
Ensure each stock has a unique ticker symbol.
Include stocks from various sectors like technology, healthcare, energy, consumer goods, financials, etc.
Values for price, change, volume, marketCap should be realistic for publicly traded companies.
- Market cap should be a large positive integer (e.g., millions or billions).
- Volume should also be a large positive integer.
- Price, high, low, open, previousClose should be positive numbers.
- High must be greater than or equal to low.
- changePercent should be a decimal representing percentage (e.g., 0.05 for 5%, -0.02 for -2%).
- fiftyTwoWeekHigh should be greater than or equal to the current price and today's high.
- fiftyTwoWeekLow should be less than or equal to the current price and today's low.

Adhere strictly to the provided JSON schema for the output.
`,
});

const generateStockTickerDataFlow = ai.defineFlow(
  {
    name: 'generateStockTickerDataFlow',
    inputSchema: GenerateStockTickerDataInputSchema,
    outputSchema: GenerateStockTickerDataOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output || !output.stocks) {
        throw new Error("AI failed to generate valid stock data.");
    }
    // Ensure all required fields are present, even if AI omits optional ones sometimes when it shouldn't for core display
    const validatedStocks = output.stocks.map(stock => ({
        ...stock,
        open: stock.open ?? stock.price * (1 - (Math.random() * 0.02 - 0.01)), // small random variation if missing
        previousClose: stock.previousClose ?? stock.price - stock.change,
        marketCap: stock.marketCap ?? stock.price * (Math.random() * 50000000 + 10000000), // estimate if missing
        fiftyTwoWeekHigh: stock.fiftyTwoWeekHigh ?? Math.max(stock.price, stock.high) * (Math.random() * 0.5 + 1.05),
        fiftyTwoWeekLow: stock.fiftyTwoWeekLow ?? Math.min(stock.price, stock.low) * (1 - Math.random() * 0.5),
    }));
    return { stocks: validatedStocks };
  }
);
