'use server';

/**
 * @fileOverview An AI-powered text correction tool.
 *
 * - correctText - A function that corrects and enhances extracted text using AI.
 * - CorrectTextInput - The input type for the correctText function.
 * - CorrectTextOutput - The return type for the correctText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CorrectTextInputSchema = z.object({
  text: z.string().describe('The extracted text to correct and enhance.'),
});
export type CorrectTextInput = z.infer<typeof CorrectTextInputSchema>;

const CorrectTextOutputSchema = z.object({
  correctedText: z
    .string()
    .describe('The AI-corrected and enhanced version of the input text.'),
});
export type CorrectTextOutput = z.infer<typeof CorrectTextOutputSchema>;

export async function correctText(input: CorrectTextInput): Promise<CorrectTextOutput> {
  return correctTextFlow(input);
}

const correctTextPrompt = ai.definePrompt({
  name: 'correctTextPrompt',
  input: {schema: CorrectTextInputSchema},
  output: {schema: CorrectTextOutputSchema},
  prompt: `You are an AI-powered text correction tool. Your task is to correct and enhance the given text, improving its accuracy and readability.

Original Text: {{{text}}}

Corrected Text:`,
});

const correctTextFlow = ai.defineFlow(
  {
    name: 'correctTextFlow',
    inputSchema: CorrectTextInputSchema,
    outputSchema: CorrectTextOutputSchema,
  },
  async input => {
    const {output} = await correctTextPrompt(input);
    return output!;
  }
);
