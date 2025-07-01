import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  Grid,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CreateQuizForm from '../components/CreateQuizForm'; // Your quiz creation form component

const AdminPanel = () => {
  const { user } = useContext(AuthContext);

  const [quizTitle, setQuizTitle] = useState('');
  const [tags, setTags] = useState('');
  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], correct: 0 }
  ]);
  const [topic, setTopic] = useState('');
  const [generateCount, setGenerateCount] = useState(3);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: '', options: ['', '', '', ''], correct: 0 }
    ]);
  };

  const handleAIGenerate = async () => {
    setError('');
    setSuccess('');
    if (!topic || !generateCount || isNaN(generateCount) || generateCount < 1 || generateCount > 20) {
      setError('Please enter a topic and a number of questions (1-20).');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/ai/generate-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`
        },
        body: JSON.stringify({ topic, numQuestions: Number(generateCount) })
      });
      const data = await res.json();
      if (res.ok && data.questions) {
        setQuestions(data.questions.map(q => ({
          question: q.questionText,
          options: q.options,
          correct: q.correctAnswer
        })));
        setSuccess('AI-generated questions loaded!');
      } else {
        setError(data.message || 'AI generation failed');
      }
    } catch {
      setError('Network error');
    }
  };

  const handleSubmitQuiz = async () => {
    setError('');
    setSuccess('');
    if (!quizTitle || questions.length === 0) {
      setError('Quiz title and at least one question are required.');
      return;
    }
    try {
      // Map questions to backend format
      const formattedQuestions = questions.map(q => ({
        questionText: q.question,
        options: q.options,
        correctAnswer: Number(q.correct)
      }));

      // Filter out empty tags
      const tagsArray = tags
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0);

      const res = await fetch('http://localhost:5000/api/quizzes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`
        },
        body: JSON.stringify({
          title: quizTitle,
          tags: tagsArray,
          questions: formattedQuestions
        })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Quiz created successfully!');
        setQuizTitle('');
        setTags('');
        setQuestions([{ question: '', options: ['', '', '', ''], correct: 0 }]);
      } else {
        setError(data.message || 'Quiz creation failed.');
      }
    } catch {
      setError('Network error while creating quiz.');
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 6, px: 2 }}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 4,
          background: '#f9f9f9',
          boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, mb: 2, color: '#333' }}
        >
          Admin Panel
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Typography variant="h6" sx={{ mb: 2 }}>
          Create Quiz
        </Typography>
        <CreateQuizForm />
        {/* You can also list and manage quizzes here */}
      </Paper>
    </Box>
  );
};

export default AdminPanel;
