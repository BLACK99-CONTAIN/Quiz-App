import express from 'express';
import Quiz from '../models/quiz.model.js';
import { getAllQuizzes, getQuizById } from '../controllers/quiz.controller.js';

const router = express.Router();

router.get('/', getAllQuizzes);
router.get('/:id', getQuizById);

// Search quizzes by topic/tag
router.get('/search', async (req, res) => {
  const { topic } = req.query;
  if (!topic) return res.status(400).json({ message: 'Topic required.' });

  const quizzes = await Quiz.find({ tags: { $regex: topic, $options: 'i' } }).limit(10);
  res.json(quizzes);
});

export default router;