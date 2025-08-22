import express from 'express';
import { generateQuiz, askChatbot } from '../controllers/ai.controller.js';

const router = express.Router();

router.post('/generate-quiz', generateQuiz);
router.post('/chatbot', askChatbot);

export default router;