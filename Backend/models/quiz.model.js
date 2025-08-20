import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [String],
  correctAnswer: Number
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tags: [String],
  questions: [questionSchema]
});

export default mongoose.model('Quiz', quizSchema);