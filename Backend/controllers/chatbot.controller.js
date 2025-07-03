import { GoogleGenerativeAI } from '@google/generative-ai';

export const askChatbot = async (req, res) => {
    const { quiz, userQuestion } = req.body;
    if (!quiz || !userQuestion) {
        return res.status(400).json({ message: 'Quiz and user question are required.' });
    }
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" });

        const prompt = `
        The user just took this quiz: ${JSON.stringify(quiz)}
        The user asks: "${userQuestion}"
        Please answer as a helpful quiz assistant.
        `;

        const result = await model.generateContent(prompt);
        const aiContent = result.response.text().trim();

        res.json({ answer: aiContent });
    } catch (error) {
        console.error('Chatbot AI error:', error.message, error.response?.data || '', error.stack);
        res.status(500).json({ message: 'Chatbot failed', error: error.message });
    }
};