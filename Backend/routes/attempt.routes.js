import express from 'express';
import { submitAttempt, getUserAttempts } from '../controllers/attempt.controller.js';
import { authenticate } from '../middlewares/auth.js';
import { body } from 'express-validator';

const router = express.Router();

// Submit a quiz attempt
router.post(
  '/',
  authenticate,
  [
    body('quizId').notEmpty(),
    body('answers').isArray({ min: 1 }),
  ],
  submitAttempt
);

// Get all attempts for the logged-in user
router.get('/', authenticate, getUserAttempts);

export default router;