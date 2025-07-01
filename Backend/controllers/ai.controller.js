import { validationResult } from 'express-validator';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const generateQuizWithAI = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { topic, numQuestions } = req.body;
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `Generate ${numQuestions} multiple-choice questions about "${topic}". Each question should have 4 options and specify the correct answer index. Respond ONLY with a JSON array: [{"questionText":"...","options":["...","...","...","..."],"correctAnswer":0}]`;

        const result = await model.generateContent(prompt);
        const aiContent = result.response.text().trim();

        // Extract JSON array from the response
        let jsonStart = aiContent.indexOf('[');
        let jsonEnd = aiContent.lastIndexOf(']');
        let questions = [];
        if (jsonStart !== -1 && jsonEnd !== -1) {
            questions = JSON.parse(aiContent.substring(jsonStart, jsonEnd + 1));
        } else {
            throw new Error("Gemini did not return a valid JSON array.");
        }

        res.json({ questions });
    } catch (error) {
        console.error('AI generation error:', error.message, error.response?.data || '');
        res.status(500).json({ message: 'AI generation failed', error: error.message });
    }
};