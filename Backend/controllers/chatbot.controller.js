import axios from 'axios';

export const askChatbot = async (req, res) => {
  const { topic, userQuestion } = req.body;
  if (!topic || !userQuestion) return res.status(400).json({ message: 'Topic and question required.' });

  try {
    const prompt = `You are a helpful expert on "${topic}". Answer this question: ${userQuestion}`;
    const geminiRes = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      { contents: [{ parts: [{ text: prompt }] }] }
    );
    const answer = geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    res.json({ answer });
  } catch (err) {
    if (err.response && err.response.status === 429) {
      return res.status(429).json({ message: 'Gemini API quota exceeded. Please try again later or check your billing.' });
    }
    res.status(500).json({ message: 'Gemini API error', error: err.message });
  }
};