import express from 'express';
import { body } from 'express-validator';
import { authenticate, authorize } from '../middlewares/auth.js';
import { generateQuizWithAI } from '../controllers/ai.controller.js';

const router = express.Router();

router.post(
  '/generate-quiz',
  authenticate,
  authorize(['Admin']),
  [
    body('topic').notEmpty(),
    body('numQuestions').isInt({ min: 1, max: 20 }),
  ],
  generateQuizWithAI
);

export default router;