import Anthropic from "@anthropic-ai/sdk";
import { POSITIVE_EVENTS, NEGATIVE_EVENTS } from "@/data/events";
import { POSITIONS, PositionKey } from "@/data/positions";

const ALL_EVENTS = [...POSITIVE_EVENTS, ...NEGATIVE_EVENTS];

function buildSystemPrompt(): string {
  const positionKeys = Object.keys(POSITIONS).join(", ");
  const eventList = ALL_EVENTS.map(
    (e) => `- "${e.id}": ${e.label} — ${e.desc}`
  ).join("\n");

  return `You are a football/soccer match performance analyst. Given a natural language description of a player's match performance, extract structured data.

Valid positions: ${positionKeys}

Valid event IDs:
${eventList}

Rules:
- If the input is NOT about a football/soccer match performance, return exactly: {"error": "not_football"}
- Otherwise return JSON: {"position": "<PositionKey>", "minutesPlayed": <number>, "events": {"<eventId>": <count>}}
- Default minutesPlayed to 90 if not mentioned otherwise
- Only include events with non-zero counts
- Be conservative with counts — only extract what is clearly stated or implied
- Map natural language to the closest matching event IDs
- Return ONLY valid JSON, no explanation or markdown`;
}

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "api_error", message: "ANTHROPIC_API_KEY is not configured" },
      { status: 500 }
    );
  }

  try {
    const { description } = await request.json();

    if (!description || typeof description !== "string" || !description.trim()) {
      return Response.json(
        { error: "api_error", message: "Description is required" },
        { status: 500 }
      );
    }

    const client = new Anthropic({ apiKey });

    const message = await client.messages.create({
      model: "claude-sonnet-4-6-20250514",
      max_tokens: 1024,
      temperature: 0,
      system: buildSystemPrompt(),
      messages: [{ role: "user", content: description.trim() }],
    });

    const textBlock = message.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      return Response.json(
        { error: "api_error", message: "No text response from model" },
        { status: 500 }
      );
    }

    let raw = textBlock.text.trim();

    if (raw.startsWith("```")) {
      raw = raw.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
    }

    const parsed = JSON.parse(raw);

    if (parsed.error === "not_football") {
      return Response.json({ error: "not_football" });
    }

    const validPositions = Object.keys(POSITIONS);
    if (!validPositions.includes(parsed.position)) {
      return Response.json(
        { error: "api_error", message: `Invalid position: ${parsed.position}` },
        { status: 500 }
      );
    }

    const validEventIds = new Set(ALL_EVENTS.map((e) => e.id));
    const events: Record<string, number> = {};
    if (parsed.events && typeof parsed.events === "object") {
      for (const [id, count] of Object.entries(parsed.events)) {
        if (validEventIds.has(id) && typeof count === "number" && count > 0) {
          events[id] = count;
        }
      }
    }

    return Response.json({
      position: parsed.position as PositionKey,
      minutesPlayed: typeof parsed.minutesPlayed === "number" ? parsed.minutesPlayed : 90,
      events,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: "api_error", message }, { status: 500 });
  }
}
