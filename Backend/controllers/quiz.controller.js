import { validationResult } from 'express-validator';
import Quiz from '../models/quiz.model.js';

// Create a new quiz (Admin only)
export const createQuiz = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, tags, questions } = req.body;

    // Add this block for extra validation
    if (!title || !Array.isArray(tags) || !Array.isArray(questions)) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // Validate each question
    for (let q of questions) {
        if (
            !q.questionText ||
            !Array.isArray(q.options) ||
            q.options.length !== 4 ||
            typeof q.correctAnswer !== 'number'
        ) {
            return res.status(400).json({ message: 'Invalid question format' });
        }
    }

    try {
        const quiz = new Quiz({
            title,
            tags,
            questions,
            createdBy: req.user.userId, // req.user set by auth middleware
        });
        await quiz.save();
        res.status(201).json({ message: 'Quiz created', quiz });
    } catch (error) {
        res.status(500).json({ message: 'Error creating quiz', error });
    }
};

// Get all quizzes
export const getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find().populate('createdBy', 'username');
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching quizzes', error });
    }
};

// Get a single quiz by ID
export const getQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id).populate('createdBy', 'username');
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
        res.status(200).json(quiz);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching quiz', error });
    }
};

// Update quiz
export const updateQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
        res.json({ message: 'Quiz updated', quiz });
    } catch (error) {
        res.status(500).json({ message: 'Update failed', error });
    }
};

// Delete quiz
export const deleteQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndDelete(req.params.id);
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
        res.json({ message: 'Quiz deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Delete failed', error });
    }
};