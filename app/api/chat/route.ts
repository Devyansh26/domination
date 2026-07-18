import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `You are EmerGen AI, a helpful medical emergency assistant built into the EmerGen Health Emergency Response Portal. 

Your role is to:
- Help users understand emergency symptoms and when to seek help
- Provide first aid guidance and general health information  
- Answer questions about the portal's features (Emergency Contacts, Healthcare Facilities, Medical Info pages)
- Guide users to the right resources within the app
- Remind users to call 911 for life-threatening emergencies

Important rules:
- Always recommend calling 911 or seeking professional medical care for serious symptoms
- Never diagnose medical conditions — you can provide information but always defer to doctors
- Keep answers concise and actionable — people in emergencies need quick, clear guidance
- If unsure, err on the side of caution and recommend professional help
- Be warm, calm, and reassuring

The portal has three main features:
1. Emergency Contacts — quick-dial numbers (911, Poison Control 1-800-222-1222, Crisis Lifeline 988, etc.)
2. Healthcare Facilities — interactive map to find nearby hospitals, urgent care, pharmacies
3. Medical Information — first aid guides, symptom checker, medication info, conditions database`;

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "Gemini API key not configured. Add GEMINI_API_KEY to .env.local" },
        { status: 500 }
      );
    }

    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: "Invalid messages array" }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    // Convert messages to Gemini history format
    // The last message is the user's current prompt
    const history = messages.slice(0, -1).map((msg: { role: string; content: string }) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const lastMessage = messages[messages.length - 1];

    const chat = model.startChat({ history });
    const result = await chat.sendMessageStream(lastMessage.content);

    // Stream the response using ReadableStream
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error: unknown) {
    console.error("Chat API error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return Response.json({ error: `Failed to get AI response: ${message}` }, { status: 500 });
  }
}
