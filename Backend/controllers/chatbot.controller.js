import axios from 'axios';
import { validationResult } from 'express-validator';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const chatbotReply = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { question, quizId, attemptId } = req.body;
    try {
        const prompt = `A user asked: "${question}" about quiz ID ${quizId} and attempt ID ${attemptId}. Provide a helpful explanation.`;
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 500,
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        const aiContent = response.data.choices[0].message.content;
        res.json({ reply: aiContent });
    } catch (error) {
        res.status(500).json({ message: 'Chatbot failed', error: error.message });
    }
};

export const askChatbot = async (req, res) => {
    const { quiz, userQuestion } = req.body;
    if (!quiz || !userQuestion) {
        return res.status(400).json({ message: 'Quiz and user question are required.' });
    }
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // You can customize the prompt as needed
        const prompt = `
        The user just took this quiz: ${JSON.stringify(quiz)}
        The user asks: "${userQuestion}"
        Please answer as a helpful quiz assistant.
        `;

        const result = await model.generateContent(prompt);
        const aiContent = result.response.text().trim();

        res.json({ answer: aiContent });
    } catch (error) {
        res.status(500).json({ message: 'Chatbot error', error: error.message });
    }
};