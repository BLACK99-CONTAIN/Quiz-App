import express from 'express';
import { submitAttempt } from '../controllers/attempt.controller.js';
import { authenticate } from '../middlewares/auth.js'; // <-- import your auth middleware

const router = express.Router();

// protect this route
router.post('/', authenticate, submitAttempt);

export default router;
