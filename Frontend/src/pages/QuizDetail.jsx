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
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 6, px: { xs: 1, sm: 2, md: 4 } }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 } }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
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
          <Button variant="contained" sx={{ mt: 2, minWidth: 180 }} onClick={() => navigate(`/attempt/${quiz._id}`)}>
            Attempt Quiz
          </Button>
        )}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </Paper>
    </Box>
  );
};

export default QuizDetail;