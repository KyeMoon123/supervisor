import { parseSearchParams } from "@/server/utils/api";
import {
  AiStreamRequestSchema,
  type AiAction,
} from "@/shared/api-interface/ai";
import { openai } from "@ai-sdk/openai";
import { streamText, type ModelMessage } from "ai";
import { NextRequest } from "next/server";

// Using GET with query parameters
export async function GET(request: NextRequest) {
  try {
    const { prompt, context, action, selection } = parseSearchParams(
      request,
      AiStreamRequestSchema
    );

    const systemPrompt = getSystemPrompt(action);

    const messages: ModelMessage[] = [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt },
    ];
    if (context) {
      messages.push({
        role: "user",
        content: `Here is the surrounding text: ${context}`,
      });
    }
    if (selection) {
      messages.push({
        role: "user",
        content: `Here is the selected text: ${selection}`,
      });
    }

    const response = streamText({
      model: openai("gpt-4o-mini"),
      messages: messages,
    });
    return response.toTextStreamResponse();
  } catch (error) {
    console.error("Error in stream", error);
    return new Response("Error in stream", { status: 500 });
  }
}

function getSystemPrompt(action: AiAction) {
  switch (action) {
    case "draft":
      return `
You are a AI Prompt drafting assistant.
Draft clear, markdown prompts from the users request. Use best practices for formatting and structure for LLM prompts.
Do not respond with anything other than the prompt.
`;

    case "edit_selection":
      return `
You are a AI Prompt editing assistant.
You will be given a text selection of a prompt that the user wants to edit along with some instructions on what to edit.
Edit the prompt to the users instructions.
Do not respond with anything other than the revised version of the selected text
Use the context of the surrounding text to help you edit the prompt.
Remember that you are editing in place, so aim to match your output to the surrounding text structure and formatting.
`;

    case "summarise":
      return `
You are a AI Prompt summarisation engine.
Preserve key legal meaning.
Avoid speculation.
`;

    default:
      throw new Error("Unknown action");
  }
}
