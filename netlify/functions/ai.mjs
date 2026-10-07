import OpenAI from "openai";

export default async (req) => {
  try {
    if (req.method === "GET") {
      return new Response(
        JSON.stringify({
          ok: true,
          message: "SÖZ DETEKTIV AI function is online."
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    const { word, sentence } = await req.json();

    if (!word || !sentence) {
      return new Response(
        JSON.stringify({
          error: "Сөз бен сөйлем қажет."
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: "OPENAI_API_KEY табылмады."
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    const client = new OpenAI({
      apiKey: apiKey
    });

    const response = await client.responses.create({
      model: "gpt-5-mini",
      input: `Сен 4-сынып оқушысына қазақ тілін түсіндіретін көмекшісің.

Қазақ сөзі: ${word}

Сөйлем: ${sentence}

Осы сөйлемдегі "${word}" сөзінің нақты контекстік мағынасын анықта.

Сөздің жалпы сөздік мағынасын ғана айтпа.
Сөйлемдегі контекстке сүйен.

Жауапты 2-3 қысқа, түсінікті сөйлеммен қазақша бер.`
    });

    return new Response(
      JSON.stringify({
        answer: response.output_text || "ЖИ жауап бере алмады."
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );

  } catch (error) {
    console.error("OPENAI ERROR:", error);

    return new Response(
      JSON.stringify({
        error: "AI қатесі",
        details: error?.message || "Белгісіз қате",
        type: error?.type || null,
        code: error?.code || null
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};
