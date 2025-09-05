import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, Button } from '@mui/material';

const QuizAttempt = () => {
  const navigate = useNavigate();
  const quiz = JSON.parse(localStorage.getItem('currentQuiz') || 'null');

  if (!quiz || !quiz.questions) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" color="error">
          No quiz found. Please search a topic first.
        </Typography>
        <Button sx={{ mt: 2 }} variant="contained" onClick={() => navigate('/topic')}>
          Back to Topic Search
        </Button>
      </Box>
    );
  }

  const [answers, setAnswers] = useState(Array(quiz.questions.length).fill(''));

  const handleChange = (idx, value) => {
    const newAnswers = [...answers];
    newAnswers[idx] = value;
    setAnswers(newAnswers);
  };

 const handleSubmit = async () => {
  localStorage.setItem('userAnswers', JSON.stringify(answers));
  await fetch('https://quiz-app-backend-fsd8.onrender.com/api/attempts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}` // <-- if using JWT
    },
    body: JSON.stringify({ quizId: quiz._id, answers }), // <-- include quizId
  });
  navigate('/chatbot');
};


  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(120deg, #fffbe6 0%, #fff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Poppins, Inter, Arial, sans-serif' }}>
      <Paper elevation={12} sx={{ p: { xs: 4, md: 8 }, borderRadius: 8, background: '#fff', color: '#23243a', boxShadow: '0 16px 64px rgba(30,39,70,0.10)', width: '100%', maxWidth: 700 }}>
        <Typography variant="h3" sx={{ fontWeight: 900, color: '#168f5c', mb: 2, textAlign: 'center' }}>{quiz.topic} Quiz</Typography>
        {quiz.questions.map((q, idx) => (
          <Box key={idx} sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Q{idx + 1}: {q.question}</Typography>
            {q.options && q.options.map((opt, oidx) => (
              <Button key={oidx} variant={answers[idx] === String(oidx) ? "contained" : "outlined"} sx={{ m: 0.5, borderRadius: 3, background: answers[idx] === String(oidx) ? 'linear-gradient(90deg, #1db954 0%, #1aa260 100%)' : '#f5f7fa', color: answers[idx] === String(oidx) ? '#fff' : '#23243a', fontWeight: 600 }} onClick={() => handleChange(idx, String(oidx))}>{opt}</Button>
            ))}
          </Box>
        ))}
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            background: 'linear-gradient(90deg, #1db954 0%, #1aa260 100%)',
            color: '#fff',
            borderRadius: 4,
            fontWeight: 700,
            fontSize: 22,
            boxShadow: '0 4px 16px rgba(30,39,70,0.10)',
            py: 1.5,
            '&:hover': { background: 'linear-gradient(90deg, #1aa260 0%, #1db954 100%)', color: '#fff' }
          }}
          onClick={handleSubmit}
          disabled={answers.some(a => a === '')}
        >
          Submit Answers
        </Button>
        {answers.some(a => a === '') && (
          <Typography color="error" sx={{ mt: 2 }}>
            Please answer all questions before submitting.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default QuizAttempt;
