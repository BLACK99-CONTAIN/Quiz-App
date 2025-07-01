import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: Number, required: true }, // index of correct option
});

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    tags: [{ type: String }],
    questions: [questionSchema],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('Quiz', quizSchema);