
"use client";

import type { NewsArticle } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
// Removed Image, Loader2, generateNewsImage, useState, useEffect imports

interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
  // Removed useState for currentImageUrl and isGeneratingImage
  // Removed useEffect for image generation

  return (
    <Card className="flex flex-col h-full shadow-md hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-2">
        {/* Removed image container and Image component */}
        <CardTitle className="text-lg font-semibold leading-snug">{article.headline}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          {article.source} &bull; {format(new Date(article.date), 'MMM dd, yyyy HH:mm')}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-foreground/80 line-clamp-4">
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

