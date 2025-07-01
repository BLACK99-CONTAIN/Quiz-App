import express from 'express';
import { body } from 'express-validator';
import { createQuiz, getAllQuizzes, getQuizById, updateQuiz, deleteQuiz } from '../controllers/quiz.controller.js';
import { authenticate, authorize } from '../middlewares/auth.js';

const router = express.Router();

// Only Admins can create quizzes
router.post(
  '/',
  authenticate,
  authorize(['Admin']),
  [
    body('title').notEmpty(),
    body('questions').isArray({ min: 1 }),
    body('questions.*.questionText').notEmpty(),
    body('questions.*.options').isArray({ min: 2 }),
    body('questions.*.correctAnswer').isInt(),
  ],
  createQuiz
);

// All users can view quizzes
router.get('/', authenticate, getAllQuizzes);

// All users can view a specific quiz by ID
router.get('/:id', authenticate, getQuizById);

// Only Admins can update or delete quizzes
router.put('/:id', authenticate, authorize(['Admin']), updateQuiz);
router.delete('/:id', authenticate, authorize(['Admin']), deleteQuiz);

export default router;