import React, { useState, useContext } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Link,
  Divider
} from '@mui/material';

import LockIcon from '@mui/icons-material/Lock';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        login(data.token, data.role, data.username);
        if (data.role === 'Admin' || data.role === 'User') {
          navigate('/dashboard');
        } else {
          navigate('/admin');
        }
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 6,
          width: 400,
          background: 'rgba(30,30,40,0.85)',
          color: '#f5f7fa',
          borderRadius: 6,
          boxShadow: '0 12px 48px rgba(0,0,0,0.25)',
          border: '1.5px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(8px)'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <LockIcon sx={{ fontSize: 48, color: '#ff1744' }} />
        </Box>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{
            color: '#ffd166',
            fontWeight: 800,
            textShadow: '0 2px 12px #000'
          }}
        >
          Sign in to Quiz App
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username or E-mail"
            name="username"
            value={form.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            sx={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 1 }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            sx={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 1 }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: '#2d3e50',
              color: '#fff',
              fontWeight: 600,
              '&:hover': { backgroundColor: '#1c2b3a' }
            }}
            fullWidth
          >
            Sign In
          </Button>
        </form>
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Link href="#" variant="body2" underline="hover">
            Forgot Password?
          </Link>
        </Box>
        <Box sx={{ textAlign: 'center', mt: 1 }}>
          <Typography variant="body2">
            Don't have an account?{' '}
            <Link component={RouterLink} to="/register" underline="hover">
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
