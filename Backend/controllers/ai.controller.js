import axios from 'axios';

export const generateQuiz = async (req, res) => {
  const { topic } = req.body;
  if (!topic) return res.status(400).json({ message: 'Topic required.' });

  try {
    const prompt = `Generate 10 multiple-choice questions about "${topic}". Each question should have 4 options and indicate the correct answer index. Respond in JSON: [{question, options, correctAnswer}]`;

   const geminiRes = await axios.post(
  `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
  {
    contents: [{ role: "user", parts: [{ text: prompt }] }]
  }
);


    let text = geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    text = text.replace(/```json|```/g, "").trim();

    let questions;
    try {
      questions = JSON.parse(text);
    } catch (e) {
      throw new Error("Failed to parse Gemini response: " + text);
    }

    res.json({ topic, questions });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({
      message: 'Gemini API error',
      error: err.response?.data || err.message
    });
  }
};


export const askChatbot = async (req, res) => {
  const { topic, userQuestion } = req.body;
  if (!topic || !userQuestion) return res.status(400).json({ message: 'Topic and question required.' });

  try {
    const prompt = `You are a helpful expert on "${topic}". Answer this question: ${userQuestion}`;
    const geminiRes = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ role: "user", parts: [{ text: prompt }] }]
      }
    );
    const answer = geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    res.json({ answer });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ message: 'Gemini API error', error: err.response?.data || err.message });
  }
};