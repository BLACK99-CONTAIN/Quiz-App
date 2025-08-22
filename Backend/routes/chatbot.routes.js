import express from 'express';
import { askChatbot } from '../controllers/chatbot.controller.js';
import { authenticate } from '../middlewares/auth.js'; // <-- import your auth middleware
const router = express.Router();

router.post('/ask',authenticate, askChatbot);

export default router;