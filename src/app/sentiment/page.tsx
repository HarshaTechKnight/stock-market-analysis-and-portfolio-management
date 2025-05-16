import SentimentAnalyzer from '@/components/sentiment/SentimentAnalyzer';

export default function SentimentPage() {
  return (
    <div className="space-y-6">
      {/* Page title is handled by SentimentAnalyzer component's CardHeader */}
      <SentimentAnalyzer />
    </div>
  );
}
