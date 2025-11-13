// @/lib/actions.ts
'use server';

import { correctText } from '@/ai/flows/ai-powered-text-correction';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const CorrectionSchema = z.object({
  text: z.string().min(1, 'Text cannot be empty.'),
});

export async function getAiCorrectedText(prevState: any, formData: FormData) {
  const validatedFields = CorrectionSchema.safeParse({
    text: formData.get('text'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid input.',
    };
  }

  try {
    const result = await correctText({ text: validatedFields.data.text });
    if (result.correctedText) {
      return { correctedText: result.correctedText, message: 'Text corrected successfully.' };
    }
    return { message: 'AI correction failed to produce text.' };
  } catch (error) {
    console.error(error);
    return { message: 'An error occurred during AI correction.' };
  }
}
