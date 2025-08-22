import Attempt from '../models/attempt.model.js';
import Quiz from '../models/quiz.model.js';
import { validationResult } from 'express-validator';

// Submit a quiz attempt
export const submitAttempt = async (req, res) => {
    const { answers } = req.body;
    if (!answers || !Array.isArray(answers) || answers.some(a => a === '')) {
        return res.status(400).json({ message: 'All questions must be answered.' });
    }
    try {
        const { quizId } = req.body;
        const quiz = await Quiz.findById(quizId);
        let score = 0;
        quiz.questions.forEach((q, idx) => {
            if (answers[idx] === q.correctAnswer) score++;
        });
        const attempt = new Attempt({
            user: req.user.userId,
            quiz: quizId,
            answers,
            score, // <-- Save score!
        });
        await attempt.save();
        res.status(201).json({ message: 'Attempt submitted', score, total: quiz.questions.length });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting attempt', error });
    }
};

// Get all attempts for the logged-in user
export const getUserAttempts = async (req, res) => {
    try {
        const attempts = await Attempt.find({ user: req.user.userId }).populate('quiz');
        // Format attempts for frontend
        const formatted = attempts.map(a => ({
            _id: a._id,
            quizTitle: a.quiz?.title || 'Unknown Quiz',
            score: a.score,
        }));
        res.json(formatted);
    } catch (error) {
        res.status(500).json({ message: 'Failed to load attempts' });
    }
};