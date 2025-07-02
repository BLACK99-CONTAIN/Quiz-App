import React, { useState, useContext } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Box, Button, TextField, Typography, Alert, Paper, Link, MenuItem } from '@mui/material';

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
        // Auto-login after registration
        const loginRes = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: form.username, password: form.password }),
        });
        const loginData = await loginRes.json();
        if (loginRes.ok) {
          login(loginData.token, loginData.role, loginData.username);
          if (loginData.role === 'Admin') navigate('/admin');
          else navigate('/dashboard');
        } else {
          setError('Registration succeeded but login failed.');
        }
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <>
      <Box>
        <Paper
          elevation={10}
          sx={{
            p: { xs: 3, sm: 6 },
            borderRadius: 6,
            background: "rgba(34,36,58,0.92)",
            color: "#f5f7fa",
            boxShadow: "0 12px 48px rgba(30,39,70,0.35)",
            width: "100%",
            maxWidth: 400,
          }}
        >
          <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 700, color: '#ffd166' }}>
            Register
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              name="username"
              value={form.username}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              InputProps={{ style: { color: '#fff' } }}
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
              InputProps={{ style: { color: '#fff' } }}
            />
            <TextField
              select
              label="Role"
              name="role"
              value={form.role}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputProps={{ style: { color: '#fff' } }}
            >
              <MenuItem value="User">User</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </TextField>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2, mb: 1, fontWeight: 600, fontSize: 18 }}
            >
              Register
            </Button>
          </form>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Already have an account?{' '}
            <Link component={RouterLink} to="/login" sx={{ color: '#ffd166' }}>
              Login
            </Link>
          </Typography>
        </Paper>
      </Box>
    </>
  );
};

export default Register;