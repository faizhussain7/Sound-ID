import { GEMINI_PROMPT } from "@/constants/prompts";
import { Song } from "@/types/Song";

async function fileToBase64(uri: string): Promise<string> {
  const response = await fetch(uri);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      resolve(base64String.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

type IdentifyInput = { fileUri: string; mimeType?: string } | string;

export async function identifySongWithGemini(
  input: IdentifyInput
): Promise<Song> {
  try {
    const fileUri = typeof input === "string" ? input : input.fileUri;
    const mimeType =
      typeof input === "string" ? "audio/mp3" : (input.mimeType ?? "audio/mp3");
    const base64Audio = await fileToBase64(fileUri);
    const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "Missing EXPO_PUBLIC_GEMINI_API_KEY. Add it to your .env and restart the dev server."
      );
    }
    const apiEndpoint =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

    const payload = {
      contents: [
        {
          role: "user",
          parts: [
            { text: GEMINI_PROMPT },
            {
              inlineData: {
                mimeType,
                data: base64Audio,
              },
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.2,
        topP: 0.8,
        topK: 40,
      },
      tools: [{ urlContext: {} }, { googleSearch: {} }],
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_LOW_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_LOW_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_LOW_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_LOW_AND_ABOVE",
        },
      ],
    };

    const response = await fetch(`${apiEndpoint}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(`Gemini API Error: ${JSON.stringify(err)}`);
    }

    const data = await response.json();
    const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textResponse) throw new Error("Empty response from Gemini");
    const cleanedResponse = textResponse
      .trim()
      .replace(/^```(?:json)?/, "")
      .replace(/```$/, "")
      .trim();

    let songData: Song;
    try {
      songData = JSON.parse(cleanedResponse) as Song;
    } catch (err) {
      throw new Error("Invalid JSON format received from Gemini");
    }

    if (!songData.name && !songData.artist) {
      songData.description =
        songData.description ||
        "Unable to identify song. Please try a clearer or longer audio sample.";
    }

    if (!songData.albumArt && songData.name) {
      songData.albumArt = `https://via.placeholder.com/300x300?text=${encodeURIComponent(
        songData.name
      )}`;
    }

    if (songData.release_date) {
      const match = songData.release_date.match(/^(\d{4})/);
      if (match) songData.year = parseInt(match[1], 10);
    }

    return songData;
  } catch (error) {
    console.error("Error identifying song:", error);
    throw error;
  }
}
