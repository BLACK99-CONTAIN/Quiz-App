import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Paper, Typography, Button, Box, Alert } from '@mui/material';

const QuizDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [quiz, setQuiz] = useState(null);
  const [attempted, setAttempted] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/quizzes/${id}`, {
      headers: { Authorization: `Bearer ${user?.token}` }
    })
      .then(res => res.json())
      .then(data => setQuiz(data));

    fetch('http://localhost:5000/api/attempts', {
      headers: { Authorization: `Bearer ${user?.token}` }
    })
      .then(res => res.json())
      .then(attempts => {
        if (attempts.some(a => a.quiz === id)) setAttempted(true);
      });
  }, [id, user]);

  if (!quiz) return <Typography align="center" sx={{ mt: 8 }}>Loading...</Typography>;

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(120deg, #fffbe6 0%, #fff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Paper elevation={12} sx={{
        p: { xs: 4, md: 8 },
        borderRadius: 8,
        background: '#fff',
        color: '#23243a',
        boxShadow: '0 16px 64px rgba(30,39,70,0.10)',
        width: '100%',
        maxWidth: 700,
      }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 900, color: '#168f5c', mb: 2 }}>
          {quiz.title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Tags: {quiz.tags?.join(', ')}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Questions: {quiz.questions.length}
        </Typography>
        {attempted ? (
          <Alert severity="success" sx={{ mt: 2 }}>You have already attempted this quiz.</Alert>
        ) : (
          <Button variant="contained" sx={{
            mt: 2,
            minWidth: 180,
            background: 'linear-gradient(90deg, #1db954 0%, #fffbe6 100%)',
            color: '#23243a',
            borderRadius: 4,
            fontWeight: 700,
            fontSize: 20,
            '&:hover': {
              background: 'linear-gradient(90deg, #fffbe6 0%, #1db954 100%)',
              color: '#23243a',
            },
          }} onClick={() => navigate(`/attempt/${quiz._id}`)}>
            Attempt Quiz
          </Button>
        )}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </Paper>
    </Box>
  );
};

export default QuizDetail;