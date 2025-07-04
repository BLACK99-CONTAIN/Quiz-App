import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { List, Paper, Box, Typography, Button } from '@mui/material';

const QuizList = () => {
  const { user } = useContext(AuthContext);
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/quizzes', {
      headers: { Authorization: `Bearer ${user?.token}` }
    })
      .then(res => res.json())
      .then(data => setQuizzes(data));
  }, [user]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(120deg, #fffbe6 0%, #fff 100%)',
        py: 6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={12}
        sx={{
          p: { xs: 4, md: 8 },
          borderRadius: 8,
          background: '#fff',
          color: '#23243a',
          boxShadow: '0 16px 64px rgba(30,39,70,0.10)',
          width: '100%',
          maxWidth: 1000,
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{ fontWeight: 900, textAlign: 'center', color: '#168f5c', mb: 4 }}
        >
          Available Quizzes
        </Typography>
        <List sx={{ mt: 2 }}>
          {quizzes.map(q => (
            <Paper
              key={q._id}
              sx={{
                mb: 3,
                p: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                borderLeft: '6px solid #1db954',
                minWidth: { xs: '100%', md: 700 },
                maxWidth: '100%',
                background: '#f5f7fa',
                color: '#23243a',
                borderRadius: 4,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>{q.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  Tags: {q.tags?.join(', ')}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  sx={{
                    fontWeight: 600,
                    minWidth: 120,
                    background: 'linear-gradient(90deg, #1db954 0%, #fffbe6 100%)',
                    color: '#23243a',
                    borderRadius: 3,
                    '&:hover': {
                      background: 'linear-gradient(90deg, #fffbe6 0%, #1db954 100%)',
                      color: '#23243a',
                    },
                  }}
                  onClick={() => navigate(`/quizzes/${q._id}`)}
                >
                  View / Attempt
                </Button>
              </Box>
            </Paper>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default QuizList;
