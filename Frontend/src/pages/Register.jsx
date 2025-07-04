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
  Divider,
  MenuItem
} from '@mui/material';

const Register = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '', role: 'User' });
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        login(data.token, data.role, data.username);
        navigate('/dashboard');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(120deg, #fffbe6 0%, #fff 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Poppins, Inter, Arial, sans-serif',
      }}
    >
      <Paper
        elevation={12}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          width: { xs: '98%', md: 1100, xl: 1400 },
          minHeight: { xs: 500, md: 600, xl: 700 },
          borderRadius: 8,
          overflow: 'hidden',
          boxShadow: '0 16px 64px rgba(30,39,70,0.15)',
          background: '#fff',
        }}
      >
        {/* Illustration */}
        <Box
          sx={{
            flex: 1,
            background: 'linear-gradient(120deg, #fffbe6 0%, #fff 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: { xs: 2, md: 6 },
          }}
        >
          <img
            src="/illustration.svg"
            alt="Register Illustration"
            style={{ width: '100%', maxWidth: 400, height: 'auto' }}
          />
        </Box>
        {/* Register Form */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            px: { xs: 3, md: 8, xl: 12 },
            py: { xs: 4, md: 0 },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: '#23243a',
              mb: 1,
              fontFamily: 'Poppins, Inter, Arial, sans-serif',
              letterSpacing: 1,
            }}
          >
            Sign up
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#888',
              mb: 4,
              fontSize: 20,
              fontFamily: 'Poppins, Inter, Arial, sans-serif',
            }}
          >
            Create your account to start using Quiz App!
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="username"
              value={form.username}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              InputProps={{
                sx: {
                  borderRadius: 4,
                  background: '#f5f7fa',
                  fontFamily: 'Poppins, Inter, Arial, sans-serif',
                  fontSize: 18,
                },
              }}
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
              InputProps={{
                sx: {
                  borderRadius: 4,
                  background: '#f5f7fa',
                  fontFamily: 'Poppins, Inter, Arial, sans-serif',
                  fontSize: 18,
                },
              }}
            />
            <TextField
              select
              label="Role"
              name="role"
              value={form.role}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputProps={{
                sx: {
                  borderRadius: 4,
                  background: '#f5f7fa',
                  fontFamily: 'Poppins, Inter, Arial, sans-serif',
                  fontSize: 18,
                },
              }}
            >
              <MenuItem value="User">User</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </TextField>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                mb: 2,
                background: 'linear-gradient(90deg, #1db954 0%, #1aa260 100%)',
                color: '#fff',
                borderRadius: 4,
                fontWeight: 700,
                fontSize: 22,
                fontFamily: 'Poppins, Inter, Arial, sans-serif',
                boxShadow: '0 4px 16px rgba(30,39,70,0.10)',
                py: 1.5,
                '&:hover': {
                  background: 'linear-gradient(90deg, #1aa260 0%, #1db954 100%)',
                  color: '#fff',
                },
              }}
            >
              Sign up
            </Button>
          </form>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          <Divider sx={{ my: 3 }} />
          <Typography variant="body2" align="center" sx={{ mt: 2, color: '#888', fontSize: 18 }}>
            Already have an account?{' '}
            <Link component={RouterLink} to="/login" sx={{ color: '#1db954', fontWeight: 600 }}>
              Log in
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;