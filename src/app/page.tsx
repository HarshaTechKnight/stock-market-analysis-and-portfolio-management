import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CandlestickChart, Brain, Briefcase, Newspaper } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">Welcome to MarketSage</CardTitle>
          <CardDescription className="text-lg">
            Your AI-powered companion for navigating the stock market. Get real-time data, sentiment analysis, and manage your portfolio all in one place.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-6">
            Explore the features below to get started:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FeatureLink href="/ticker" icon={CandlestickChart} title="Real-Time Stock Ticker" description="Track live stock prices and key metrics." />
            <FeatureLink href="/sentiment" icon={Brain} title="AI Sentiment Analysis" description="Leverage AI to understand market sentiment for any stock." />
            <FeatureLink href="/portfolio" icon={Briefcase} title="Personal Portfolio" description="Add and monitor your stock investments." />
            <FeatureLink href="/news" icon={Newspaper} title="Market News Feed" description="Stay updated with the latest financial news." />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Quick Start</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">New to Investing?</h3>
            <p className="text-muted-foreground">
              Start by exploring the <Link href="/ticker" className="text-primary hover:underline">Stock Ticker</Link> to see how markets move.
              Then, read up on the <Link href="/news" className="text-primary hover:underline">Latest News</Link> to understand market drivers.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1">Ready to Analyze?</h3>
            <p className="text-muted-foreground">
              Use our <Link href="/sentiment" className="text-primary hover:underline">AI Sentiment Analysis</Link> tool to get deeper insights into specific stocks before making investment decisions.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface FeatureLinkProps {
  href: string;
  icon: React.ElementType;
  title: string;
  description: string;
}

function FeatureLink({ href, icon: Icon, title, description }: FeatureLinkProps) {
  return (
    <Link href={href} passHref>
      <Button variant="outline" className="w-full h-auto p-4 text-left flex items-start space-x-4 hover:bg-accent/50 transition-colors duration-200">
        <Icon className="h-8 w-8 text-primary mt-1 shrink-0" />
        <div className="flex-grow">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <ArrowRight className="h-5 w-5 text-muted-foreground self-center shrink-0" />
      </Button>
    </Link>
  );
}
