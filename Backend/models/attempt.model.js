import mongoose from 'mongoose';

const attemptSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
    answers: [Number],
    score: { type: Number, required: true },
    attemptedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Attempt', attemptSchema);