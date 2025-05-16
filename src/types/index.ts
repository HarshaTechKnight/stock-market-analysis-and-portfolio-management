export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  marketCap?: number;
  previousClose?: number;
  open?: number;
  fiftyTwoWeekHigh?: number;
  fiftyTwoWeekLow?: number;
}

export interface PortfolioStock {
  id: string; // Unique ID for the portfolio item
  symbol: string;
  name: string;
  shares: number;
  purchasePrice: number;
  purchaseDate: string; // ISO date string
}

export interface NewsArticle {
  id: string;
  headline: string;
  source: string;
  date: string; // ISO date string
  summary: string;
  imageUrl?: string;
  articleUrl: string;
}
