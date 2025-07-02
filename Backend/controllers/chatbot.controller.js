import axios from 'axios';

export const askChatbot = async (req, res) => {
    const { quiz, userQuestion } = req.body;
    if (!quiz || !userQuestion) {
        return res.status(400).json({ message: 'Quiz and user question are required.' });
    }
    try {
        const prompt = `
        The user just took this quiz: ${JSON.stringify(quiz)}
        The user asks: "${userQuestion}"
        Please answer as a helpful quiz assistant.
        `;

        const response = await axios.post(
            'https://api.sambanova.ai/v1/text/generate',
            {
                model: 'Meta-Llama-3.3-70B-Instruct', // <-- Use the correct model id from your list!
                prompt,
                max_tokens: 512
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.SAMBANOVA_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const aiContent = response.data.choices[0].text.trim();
        res.json({ answer: aiContent });
    } catch (error) {
        console.error('Chatbot AI error:', error.message, error.response?.data || '', error.stack);
        res.status(500).json({ message: 'Chatbot failed', error: error.message });
    }
};