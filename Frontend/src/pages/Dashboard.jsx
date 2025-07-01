import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Paper, Typography, List, ListItem, ListItemText, Box, Button, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';

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
        width: '100vw',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: { xs: 3, sm: 6 },
          borderRadius: 6,
          width: '100%',
          maxWidth: 700,
          background: 'rgba(20,20,30,0.92)',
          color: '#f5f7fa',
          boxShadow: '0 12px 48px rgba(139,0,0,0.35)',
          mx: 'auto',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, textAlign: 'center', color: '#ffd166' }}>
          Welcome, {user?.username}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
          <Button variant="outlined" color="error" onClick={logout}>
            Logout
          </Button>
          <Button variant="contained" color="primary" onClick={() => navigate('/quizzes')}>
            Go to Quizzes
          </Button>
          {user?.role === 'Admin' && (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate('/admin')}
              sx={{ ml: 2 }}
            >
              Go to Admin Panel
            </Button>
          )}
        </Box>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#f5f7fa' }}>
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
                    <Typography variant="h6" sx={{ fontWeight: 500, color: '#f5f7fa' }}>
                      {a.quizTitle}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body1" sx={{ color: '#1976d2', fontWeight: 600 }}>
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

