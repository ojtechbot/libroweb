
'use server';

/**
 * @fileOverview Smart Reply Generation Flow
 * Provides contextual, short, and diverse reply suggestions based on conversation history.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

/**
 * Schema for the input to the smart reply flow.
 * @property history - An array of message objects, where each object has a role ('user' or 'model') and content.
 */
const SmartReplyInputSchema = z.object({
  history: z.array(
    z.object({
      role: z.enum(['user', 'model']),
      content: z.string().min(1, 'Message content cannot be empty.'),
    })
  ).min(1, 'At least one message is required in the history.'),
});

export type SmartReplyInput = z.infer<typeof SmartReplyInputSchema>;

/**
 * Schema for the output of the smart reply flow.
 * @property replies - An array of exactly 3 string suggestions for the next reply.
 */
const SmartReplyOutputSchema = z.object({
  replies: z.array(
    z.string().min(1, 'Reply suggestion cannot be empty.').max(60, 'Reply suggestion should be concise.')
  ).length(3, 'Exactly 3 reply suggestions are required.'),
});

export type SmartReplyOutput = z.infer<typeof SmartReplyOutputSchema>;

/**
 * Defines the AI prompt for generating smart replies.
 * This prompt instructs the AI to analyze a conversation and provide three distinct,
 * concise, and contextually appropriate reply options.
 */
const smartReplyPrompt = ai.definePrompt({
  name: 'smartReplyPrompt',
  model: 'googleai/gemini-pro',
  input: { schema: SmartReplyInputSchema },
  output: { schema: SmartReplyOutputSchema },
  prompt: `
    You are an expert at generating short, relevant, and diverse reply suggestions for a conversation.
    
    Analyze the following conversation history:
    {{#each history}}
      {{role}}: {{content}}
    {{/each}}
    
    Your task is to generate exactly 3 distinct reply options for the 'user'.
    - The suggestions should be concise (under 60 characters).
    - They must be contextually appropriate for continuing the conversation.
    - Provide a variety in tone and approach (e.g., a question, a statement, an affirmation).
    - Do not add any commentary or explanation.
  `,
});

/**
 * Defines the flow for generating smart replies.
 * This flow takes the conversation history, passes it to the AI prompt,
 * and returns the structured list of reply suggestions.
 */
const smartReplyFlow = ai.defineFlow(
  {
    name: 'smartReplyFlow',
    inputSchema: SmartReplyInputSchema,
    outputSchema: SmartReplyOutputSchema,
  },
  async (input) => {
    // To get the best suggestions, we only need the last few messages.
    const recentHistory = input.history.slice(-4);

    const { output } = await smartReplyPrompt({ history: recentHistory });
    
    if (!output) {
      throw new Error('Failed to generate smart reply suggestions.');
    }
    
    return output;
  }
);

/**
 * The main exported function for generating smart replies.
 * It serves as the public interface for this capability.
 * @param input The conversation history.
 * @returns A promise that resolves to an object containing 3 suggested replies.
 */
export async function smartReply(input: SmartReplyInput): Promise<SmartReplyOutput> {
  return smartReplyFlow(input);
}
