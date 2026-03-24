import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const runtime = 'edge';

const systemPrompt = `You are an elite AI trading assistant for the Elite Trader platform.
You must absolutely ONLY answer questions related to cryptocurrency, stock markets, trading strategies, technical analysis, finance, and economics.
If a user asks about any other topic (e.g., programming help, general knowledge, jokes, etc.), you MUST politely decline and steer the conversation back to trading and markets.
Your tone should be professional, precise, slightly premium, and insightful. Keep answers relatively concise unless deep analysis is requested.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: openai('gpt-4o'),
      messages,
      system: systemPrompt,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process chat request' }), { status: 500 });
  }
}
