import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Paper, Typography, List, ListItem, ListItemText, Box, Button, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [attempts, setAttempts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/attempts', {
      headers: { Authorization: `Bearer ${user?.token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setAttempts(data);
        else setError(data.message || 'Failed to load attempts');
      })
      .catch(() => setError('Failed to load attempts'));
  }, [user]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(120deg, #fffbe6 0%, #fff 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Poppins, Inter, Arial, sans-serif',
        py: 6,
      }}
    >
      <Paper
        elevation={12}
        sx={{
          p: { xs: 4, md: 8 },
          borderRadius: 8,
          width: '100%',
          maxWidth: 1000,
          background: '#fff',
          color: '#23243a',
          boxShadow: '0 16px 64px rgba(30,39,70,0.10)',
          mx: 'auto',
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 900, textAlign: 'center', color: '#168f5c', mb: 2 }}>
          Welcome, {user?.username}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
          <Button
            variant="outlined"
            sx={{
              borderRadius: 4,
              fontWeight: 700,
              borderColor: '#1db954',
              color: '#1db954',
              px: 4,
              fontSize: 18,
              '&:hover': {
                background: '#fffbe6',
                borderColor: '#1db954',
              },
            }}
            onClick={logout}
          >
            Logout
          </Button>
          <Button
            variant="contained"
            sx={{
              background: 'linear-gradient(90deg, #1db954 0%, #fffbe6 100%)',
              color: '#23243a',
              borderRadius: 4,
              fontWeight: 700,
              px: 4,
              fontSize: 18,
              boxShadow: '0 2px 8px rgba(30,39,70,0.10)',
              '&:hover': {
                background: 'linear-gradient(90deg, #fffbe6 0%, #1db954 100%)',
                color: '#23243a',
              },
            }}
            onClick={() => navigate('/quizzes')}
          >
            Go to Quizzes
          </Button>
          {user?.role === 'Admin' && (
            <Button
              variant="contained"
              sx={{
                background: 'linear-gradient(90deg, #1db954 0%, #fffbe6 100%)',
                color: '#23243a',
                borderRadius: 4,
                fontWeight: 700,
                px: 4,
                fontSize: 18,
                boxShadow: '0 2px 8px rgba(30,39,70,0.10)',
                '&:hover': {
                  background: 'linear-gradient(90deg, #fffbe6 0%, #1db954 100%)',
                  color: '#23243a',
                },
              }}
              onClick={() => navigate('/admin')}
            >
              Admin Panel
            </Button>
          )}
        </Box>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#23243a' }}>
          Your Quiz Attempts
        </Typography>
        {error && (
          <Typography variant="body1" sx={{ color: '#ff6666', textAlign: 'center', mt: 2 }}>
            {error}
          </Typography>
        )}
        <List>
          {(!attempts || attempts.length === 0) && !error ? (
            <Typography variant="body1" sx={{ color: '#888', textAlign: 'center', mt: 2 }}>
              You have not attempted any quizzes yet.
            </Typography>
          ) : (
            Array.isArray(attempts) && attempts.map(a => (
              <ListItem key={a._id} divider sx={{ py: 2 }}>
                <ListItemText
                  primary={
                    <Typography variant="h6" sx={{ fontWeight: 500, color: '#23243a' }}>
                      {a.quizTitle}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body1" sx={{ color: '#1db954', fontWeight: 600 }}>
                      Score: {a.score}
                    </Typography>
                  }
                />
              </ListItem>
            ))
          )}
        </List>
      </Paper>
    </Box>
  );
};

export default Dashboard;

