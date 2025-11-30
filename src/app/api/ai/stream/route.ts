import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { NextRequest } from "next/server";

const schema = z.object({
  summary: z.string(),
  context: z.string().optional(),
});

const systemPrompt = `
  You are a helpful assistant that specialises in LLM prompt writing. You will be fiven a breif summary of the prompt the user wants to generate
  You should write a more detailed prompt based on the summary provided.
  `;

// Using GET with query parameters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const summary = searchParams.get("summary") || "";
    const context = searchParams.get("context") || "";
    
    const { summary: validatedSummary, context: validatedContext } = schema.parse({
      summary,
      context,
    });
    console.log("summary", summary);
    console.log("context", context);
    // Make a request to OpenAI's API based on
    // a placeholder prompt
    const response = streamText({
      model: openai("gpt-4o-mini"),
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: summary },
      ],
    });
    console.log(response);
    // Respond with the stream
    return response.toTextStreamResponse({
      headers: {
        "Content-Type": "text/event-stream",
      },
    });
  } catch (error) {
    console.error("Error in stream", error);
    return new Response("Error in stream", { status: 500 });
  }
}
