import type { AnalyzeStockSentimentOutput } from '@/ai/flows/analyze-stock-sentiment';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SentimentResultDisplayProps {
  result: AnalyzeStockSentimentOutput;
}

export default function SentimentResultDisplay({ result }: SentimentResultDisplayProps) {
  const getSentimentBadgeVariant = (ranking: string) => {
    switch (ranking.toLowerCase()) {
      case 'positive':
        return 'default'; // Uses primary color
      case 'negative':
        return 'destructive';
      case 'neutral':
      default:
        return 'secondary';
    }
  };
  
  const getSentimentColorClass = (ranking: string) => {
    switch (ranking.toLowerCase()) {
      case 'positive':
        return 'text-green-500';
      case 'negative':
        return 'text-red-500';
      case 'neutral':
      default:
        return 'text-yellow-500'; // Or another neutral color like text-gray-500
    }
  }

  // Normalize score from [-1, 1] to [0, 100] for Progress component
  const progressValue = (result.sentimentScore + 1) * 50;

  return (
    <Card className="bg-accent/20 border-accent/50">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Overall Sentiment</CardTitle>
          <Badge variant={getSentimentBadgeVariant(result.sentimentRanking)} className="capitalize">
            {result.sentimentRanking}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Sentiment Score</p>
          <div className="flex items-center gap-2">
            <Progress value={progressValue} className="w-full h-3" />
            <span className={cn("font-semibold text-lg", getSentimentColorClass(result.sentimentRanking))}>
              {result.sentimentScore.toFixed(2)}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1 text-center">(-1 Negative, 0 Neutral, +1 Positive)</p>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground mb-1">Sentiment Summary</p>
          <p className="text-foreground leading-relaxed">
            {result.sentimentSummary}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
