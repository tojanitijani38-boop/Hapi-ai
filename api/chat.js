export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_KEY}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            { text: req.body.message }
                        ]
                    }
                ]
            })
        }
    );

    const data = await response.json();

    const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "عذراً، لم أستطع الرد.";

    res.status(200).json({ reply });
                          }
