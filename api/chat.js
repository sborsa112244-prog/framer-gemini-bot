export default async function handler(req, res) {
  const { message } = req.body || {};

  try {
    const reply = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" +
        process.env.GEMINI_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message || "Hello!" }] }]
        })
      }
    );

    const data = await reply.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    res.status(200).json({ answer: text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
