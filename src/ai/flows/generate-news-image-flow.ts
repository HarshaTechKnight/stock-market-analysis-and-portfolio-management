
'use server';
/**
 * @fileOverview Generates an image for a news article.
 * - generateNewsImage - A function that generates an image based on headline and summary.
 * - GenerateNewsImageInput - The input type for the generateNewsImage function.
 * - GenerateNewsImageOutput - The output type (data URI string) for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateNewsImageInputSchema = z.object({
  headline: z.string().describe('The headline of the news article.'),
  summary: z.string().describe('A brief summary of the news article.'),
});
export type GenerateNewsImageInput = z.infer<typeof GenerateNewsImageInputSchema>;

export type GenerateNewsImageOutput = string;

export async function generateNewsImage(input: GenerateNewsImageInput): Promise<GenerateNewsImageOutput> {
  return generateNewsImageFlow(input);
}

const generateNewsImageFlow = ai.defineFlow(
  {
    name: 'generateNewsImageFlow',
    inputSchema: GenerateNewsImageInputSchema,
    outputSchema: z.string().describe("A data URI of the generated image for the news article. Format: 'data:image/png;base64,<encoded_data>'."),
  },
  async (input) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-exp',
      prompt: `Generate a visually compelling, abstract or conceptual image for a news article. The image should be in landscape orientation, suitable for a financial news website, and must not contain any text. Headline: "${input.headline}". Summary: "${input.summary}".`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'], // IMAGE only is not supported by the model
      },
    });

    if (!media?.url) {
      console.error('Image generation failed: No media URL returned.', {input});
      throw new Error('Image generation failed to return a media URL.');
    }
    return media.url;
  }
);
