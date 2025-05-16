
import NewsCard from '@/components/news/NewsCard';
import type { NewsArticle } from '@/types';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const mockNews: NewsArticle[] = [
  {
    id: '1',
    headline: 'Federal Reserve Signals Potential Rate Cuts Later This Year',
    source: 'Wall Street Journal',
    date: '2024-05-15T10:30:00Z',
    summary: 'The Federal Reserve hinted at possible interest rate reductions in the latter half of the year, citing cooling inflation and a stabilizing job market. Markets reacted positively to the news.',
    // imageUrl: 'https://placehold.co/600x338.png', // imageUrl is kept in mock data but not used by NewsCard
    articleUrl: '#',
  },
  {
    id: '2',
    headline: 'Tech Stocks Rally on Strong Earnings Reports from Major Players',
    source: 'Bloomberg',
    date: '2024-05-14T15:45:00Z',
    summary: 'Several leading technology companies reported better-than-expected quarterly earnings, fueling a broad rally in the tech sector. Investor sentiment remains bullish on AI and cloud computing.',
    // imageUrl: 'https://placehold.co/600x338.png',
    articleUrl: '#',
  },
  {
    id: '3',
    headline: 'Oil Prices Fluctuate Amid Geopolitical Tensions and Supply Concerns',
    source: 'Reuters',
    date: '2024-05-15T08:00:00Z',
    summary: 'Crude oil prices saw increased volatility as ongoing geopolitical events in key regions raised concerns about potential supply disruptions. OPEC+ decisions are also being closely watched.',
    // imageUrl: 'https://placehold.co/600x338.png',
    articleUrl: '#',
  },
  {
    id: '4',
    headline: 'Retail Sales Data Shows Mixed Consumer Spending Habits',
    source: 'Associated Press',
    date: '2024-05-13T12:00:00Z',
    summary: 'The latest retail sales figures presented a mixed picture of consumer behavior, with strong growth in e-commerce but a slight downturn in brick-and-mortar store sales.',
    // imageUrl: 'https://placehold.co/600x338.png',
    articleUrl: '#',
  },
   {
    id: '5',
    headline: 'New Green Energy Initiatives Announced, Boosting Renewable Stocks',
    source: 'CleanTech News',
    date: '2024-05-15T11:00:00Z',
    summary: 'Government unveiled new initiatives to promote green energy, leading to a surge in stocks of renewable energy companies. Investment in solar and wind power is expected to increase significantly.',
    // imageUrl: 'https://placehold.co/600x338.png',
    articleUrl: '#',
  },
  {
    id: '6',
    headline: 'Cryptocurrency Market Sees Minor Correction After Recent Bull Run',
    source: 'CoinDesk',
    date: '2024-05-14T18:20:00Z',
    summary: 'The cryptocurrency market experienced a slight pullback as investors took profits following a sustained period of upward momentum. Long-term outlook remains debated among analysts.',
    // imageUrl: 'https://placehold.co/600x338.png',
    articleUrl: '#',
  },
];

// TODO: Implement actual search/filter functionality if desired.
export default function NewsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold">Market News</h1>
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search news..."
            className="pl-10 w-full sm:w-64 md:w-80 bg-card"
            // Add onChange and value for actual search functionality
          />
        </div>
      </div>
      <p className="text-muted-foreground">
        Stay updated with the latest headlines and analysis from the financial world. (News data is currently mock.)
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockNews.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
