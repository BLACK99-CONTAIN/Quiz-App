import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, Button, List } from '@mui/material';

const QuizList = () => {
  const quiz = JSON.parse(localStorage.getItem('currentQuiz') || 'null');
  const navigate = useNavigate();

  if (!quiz || !quiz.questions) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" color="error">
          No quiz found. Please search for a topic first.
        </Typography>
        <Button sx={{ mt: 2 }} variant="contained" onClick={() => navigate('/topic')}>
          Back to Topic Search
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(120deg, #fffbe6 0%, #fff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Poppins, Inter, Arial, sans-serif' }}>
      <Paper elevation={12} sx={{ p: { xs: 4, md: 8 }, borderRadius: 8, background: '#fff', color: '#23243a', boxShadow: '0 16px 64px rgba(30,39,70,0.10)', width: '100%', maxWidth: 700 }}>
        <Typography variant="h3" sx={{ fontWeight: 900, color: '#168f5c', mb: 2, textAlign: 'center' }}>{quiz.topic} Quiz</Typography>
        <List>
          {quiz.questions.map((q, idx) => (
            <Paper key={idx} sx={{ mb: 2, p: 2, borderRadius: 3, background: '#f5f7fa' }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>Q{idx + 1}: {q.question}</Typography>
              <Typography variant="body2" color="text.secondary">Options: {q.options.join(', ')}</Typography>
            </Paper>
            ))}
        </List>
        <Button variant="contained" fullWidth sx={{ mt: 3, background: 'linear-gradient(90deg, #1db954 0%, #1aa260 100%)', color: '#fff', borderRadius: 4, fontWeight: 700, fontSize: 22, boxShadow: '0 4px 16px rgba(30,39,70,0.10)', py: 1.5, '&:hover': { background: 'linear-gradient(90deg, #1aa260 0%, #1db954 100%)', color: '#fff' } }} onClick={() => navigate('/attempt')}>Attempt Quiz</Button>
        </Paper>
    </Box>
    );
};


export default QuizList;