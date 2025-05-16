
"use client";

import type { NewsArticle } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import { generateNewsImage } from '@/ai/flows/generate-news-image-flow';

interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
  const [currentImageUrl, setCurrentImageUrl] = useState(article.imageUrl || 'https://placehold.co/600x338.png');
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const generateAndSetImage = async () => {
      if (article.imageUrl && article.imageUrl.startsWith('https://placehold.co') && article.headline && article.summary) {
        if (isMounted) setIsGeneratingImage(true);
        try {
          const imageDataUri = await generateNewsImage({
            headline: article.headline,
            summary: article.summary,
          });
          if (isMounted && imageDataUri) {
            setCurrentImageUrl(imageDataUri);
          }
        } catch (error) {
          console.error(`Failed to generate news image for "${article.headline}":`, error);
          // Keep placeholder if generation fails
          if (isMounted) {
            setCurrentImageUrl(article.imageUrl || 'https://placehold.co/600x338.png');
          }
        } finally {
          if (isMounted) {
            setIsGeneratingImage(false);
          }
        }
      } else {
        // If not a placeholder, or no headline/summary, use the original URL or a default
        if (isMounted) {
          setCurrentImageUrl(article.imageUrl || 'https://placehold.co/600x338.png');
          setIsGeneratingImage(false);
        }
      }
    };

    generateAndSetImage();

    return () => {
      isMounted = false;
    };
  }, [article.imageUrl, article.headline, article.summary]);


  return (
    <Card className="flex flex-col h-full shadow-md hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-2">
        <div className="relative w-full h-48 mb-4 rounded-t-md overflow-hidden bg-muted/20">
          {isGeneratingImage && (
            <div className="absolute inset-0 flex items-center justify-center bg-card/70 z-10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          <Image
            src={currentImageUrl}
            alt={article.headline}
            layout="fill"
            objectFit="cover"
            data-ai-hint="news business" // Retained, but generated image takes precedence
            className={isGeneratingImage ? 'opacity-30' : 'opacity-100 transition-opacity duration-300'}
            unoptimized={currentImageUrl.startsWith('data:image')} // Important for data URIs
            key={currentImageUrl} // Re-trigger image load on src change
          />
        </div>
        <CardTitle className="text-lg font-semibold leading-snug">{article.headline}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          {article.source} &bull; {format(new Date(article.date), 'MMM dd, yyyy HH:mm')}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-foreground/80 line-clamp-3">
          {article.summary}
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" size="sm" className="w-full">
          <Link href={article.articleUrl} target="_blank" rel="noopener noreferrer">
            Read Full Article <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
