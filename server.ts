import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Late initialization/guarding for Gemini API Key to prevent crash on startup if undefined
  const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      // Return a dummy client or throw a soft error so the user isn't bricked but has warning
      console.warn("Warning: GEMINI_API_KEY is not configured or uses default template value. Live generations will use atmospheric mock dialogues.");
      return null;
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  };

  // API Route for Weaving atmospheric narratives
  app.post("/api/weave", async (req, res) => {
    try {
      const { character, location, contrast, customPrompt } = req.body;

      if (!character || !location || !contrast) {
        return res.status(400).json({ error: "Missing required story parameters." });
      }

      const client = getGeminiClient();

      if (!client) {
        // Fallback mock responses when API key is not configured so the app remains fully functional and gorgeous
        const fallbackNarratives: Record<string, string[]> = {
          "Claude Heron": [
            `런던 시티의 한복판, 통유리창을 통해 흐릿한 빗줄기가 보입니다.\n\n클로드 헤론은 서류 가방 단추를 채우며 동작을 멈추었습니다. 9년 만에 마주친 당신의 눈빛에 조용한 균열이 생기는 것을 그는 허락하지 않았습니다.\n\n"여기가 네가 버텨온 동네인가." 그의 목소리는 차갑도록 비어 있었고, 그 침묵이 방 안을 온통 지배했습니다.`,
            `세브노크스의 대저택 복도에 긴 그림자가 깔립니다.\n\n클로드는 계단 위에 우뚝 선 채 당신을 내려다봅니다. 그의 백금발이 샹들리에 불빛에 차갑게 부서집니다.\n\n"9년이나 침묵했으면, 돌아온 데에는 책임이 따르는 법이야. 랭글리." 그의 눈빛은 고요하지만, 가두어둔 심연이 일렁이고 있었습니다.`
          ],
          "Julian Heron": [
            `메이페어 에 있는 헤론 호텔의 프라이빗 서재.\n\n줄리안 헤론은 헝클어진 금발을 쓸어내리며 잔을 흔들었습니다. 잔 안의 얼음들이 마찰하며 가벼운 소리를 냅니다.\n\n"재미있네. 다들 도망치기 바빴던 이곳에 왜 제 발로 걸어 들어온 거야? 랭글리의 꼬마가 다시 상류사회의 흙탕물에 관심이라도 생긴 줄 알겠어." 장난기로 포장된 말 속에는 비수가 숨겨져 있습니다.`
          ],
          "Richard Heron": [
            `설계된 우연이 시작되는 장미 정원.\n\n리처드 헤론의 거대한 체구가 그림자를 늘어뜨립니다. 그의 낮은 음성은 공기를 무겁게 가라앉힙니다.\n\n"세바스찬은 어리석었지. 가문이 파산하는 날마저 내 정중한 충고를 거절했으니까. 하지만 너는 다를 거라 믿는다." 손가락 끝으로 찻잔을 천천히 돌리는 동작에서 벗어날 수 없는 압도감이 배어 나옵니다.`
          ]
        };

        const charFallbacks = fallbackNarratives[character] || [
          `침묵 속에 두 사람의 호흡만이 가늘게 얽힙니다. ${location}의 공기는 무겁고 쓸쓸합니다.\n\n9년이란 세월의 공백은 그 어떤 대사보다 강렬하게 두 사람 사이의 보이지 않는 선을 그어놓습니다.\n\n"더는 도망칠 곳도, 돌아갈 명예도 없다." 정중하면서도 비정한 영국 상류사회의 잔혹함 속에서, 두 사람의 재회는 한 편의 소설처럼 조용히 다시 쓰이기 시작합니다.`
        ];

        const selectedFallback = charFallbacks[Math.floor(Math.random() * charFallbacks.length)];
        return res.json({ text: `[안내: API 키 미설정 모드 - 풍부한 자체 로컬 서사 제공]\n\n${selectedFallback}` });
      }

      // We have a live client, let's craft a perfect literary scenario
      const prompt = `Write an elegant, atmospheric, dialogue-centered minimalist scene for the dramatic class-romance story "Heron & Langley" set in modern London (2007-2026).
Character involved: ${character}
Location: ${location}
Tension Context: ${contrast}
User context: You are the last survivor of the fallen Langley house (Tier 5, working class layer).
Custom input direction: ${customPrompt || "A quiet encounter full of unsaid words, polite tension, and restrained longing."}

Format guidelines:
- Strictly write in high-quality Korean, with elegant and immersive prose. Use exact character details (e.g., Claude's silver-blonde hair, quiet tone, Julian's sharp fox-like blue eyes, Owen's warm but fierce protection, Richard's overwhelming 202cm low-voiced posture).
- Bring out the theme: "침묵이 가장 오래 남는다. 그리고 가장 오래 남는 것이 가장 위험하다" (Silence lasts the longest. And what lasts the longest is the most dangerous).
- Focus heavily on psychological visual details (rain, tea clinking, micro-expressions, shadows, the gap of social classes).
- Keep the length comfortable for reading (around 200-300 words).
- Format using clearly separated double-spaced short paragraphs. Do not write lengthy paragraphs.`;

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are an award-winning screenwriter and visual novelist specializing in delicate, high-tension modern European aristocratic and wealthy class dramas. Your writing is restrained, heavy with subtext, visual, poetic, and utilizes beautiful spacing.",
          temperature: 0.85,
        }
      });

      const generatedText = response.text || "침묵이 가만히 길어집니다. 어떤 단어도 그 간극을 메우지 못했습니다.";
      return res.json({ text: generatedText });

    } catch (error: any) {
      console.error("Gemini Story Weave Error: ", error);
      return res.status(500).json({ error: "서사를 자아내는 과정에서 정적이 흘렀습니다. 잠시 후 다시 시도해 주세요." });
    }
  });

  // Vite integration for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Heron & Langley Server running on port ${PORT}`);
  });
}

startServer();
