import { getBasicChatReply } from "@/lib/chatAssistant";
import { PROMO_ALIAS } from "@/lib/coupon";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const runtime = "edge";

const systemPrompt = `You are a friendly assistant for The Elite Trader (theelitetrader.in).
Help with: Foundation ($49), PRO ($249), ELITE ($499), Signals packages, enrolment, and basic crypto/futures trading questions.
Keep answers concise (2-4 short paragraphs max). Be warm and professional.
Contact: Telegram https://t.me/Elitefuture, email theelitetraderx@gmail.com.
Coupon code ${PROMO_ALIAS} unlocks member pricing on the pricing page.
If asked about unrelated topics, briefly redirect to trading or the platform.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastUser = [...(messages || [])]
      .reverse()
      .find((m: { role: string }) => m.role === "user");
    const userText =
      typeof lastUser?.content === "string" ? lastUser.content : "";

    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey) {
      try {
        const result = await streamText({
          model: openai("gpt-4o-mini"),
          messages,
          system: systemPrompt,
          maxTokens: 400,
        });
        return result.toDataStreamResponse();
      } catch (aiError) {
        console.error("OpenAI chat failed, using fallback:", aiError);
      }
    }

    const reply = getBasicChatReply(userText);
    return Response.json({ reply, mode: "basic" });
  } catch (error) {
    console.error("Chat API Error:", error);
    return Response.json(
      {
        reply:
          "Sorry, something went wrong. Please try again or contact us on Telegram: t.me/Elitefuture",
        mode: "error",
      },
      { status: 200 }
    );
  }
}
