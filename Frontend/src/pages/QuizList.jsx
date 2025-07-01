import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { List, Paper, Box, Typography, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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

  // Delete quiz handler (Admin only)
  const handleDelete = async (quizId) => {
    if (!window.confirm('Are you sure you want to delete this quiz?')) return;
    const res = await fetch(`http://localhost:5000/api/quizzes/${quizId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${user?.token}` }
    });
    if (res.ok) {
      setQuizzes(quizzes.filter(q => q._id !== quizId));
    } else {
      alert('Failed to delete quiz');
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: 'auto',
        mt: 8,
        px: { xs: 1, sm: 2, md: 4 },
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: { xs: 3, sm: 6 },
          borderRadius: 6,
          background: 'rgba(20,20,30,0.92)',
          color: '#f5f7fa',
          boxShadow: '0 12px 48px rgba(139,0,0,0.35)',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: 700, textAlign: 'center', color: '#ffd166' }}
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
                boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
                borderLeft: '6px solid #1976d2',
                minWidth: { xs: '100%', md: 700 },
                maxWidth: '100%',
                background: 'rgba(255,255,255,0.07)',
                color: '#f5f7fa'
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>{q.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  Tags: {q.tags?.join(', ')}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {user?.role === 'Admin' ? (
                  <>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => navigate(`/admin/view/${q._id}`)}
                      sx={{ fontWeight: 600, minWidth: 60 }}
                    >
                      View
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<EditIcon />}
                      onClick={() => navigate(`/admin/edit/${q._id}`)}
                      sx={{ fontWeight: 600, minWidth: 60 }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(q._id)}
                      sx={{ fontWeight: 600, minWidth: 60 }}
                    >
                      Delete
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/quizzes/${q._id}`)}
                    sx={{ fontWeight: 600, minWidth: 120 }}
                  >
                    View / Attempt
                  </Button>
                )}
              </Box>
            </Paper>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default QuizList;
