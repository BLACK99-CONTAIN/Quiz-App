import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, TextField, Button } from '@mui/material';

const TopicSearch = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    setError('');
    if (!topic.trim()) return setError('Please enter a topic.');
    setLoading(true);
    try {
      const res = await fetch('https://quiz-app-backend-fsd8.onrender.com/api/ai/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });
      const data = await res.json();
      if (res.ok && data.questions) {
        localStorage.setItem('currentQuiz', JSON.stringify(data));
        navigate('/attempt');
      } else {
        setError(data.message || 'Could not generate quiz.');
      }
    } catch {
      setError('Network error');
    }
    setLoading(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(120deg, #fffbe6 0%, #fff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Poppins, Inter, Arial, sans-serif' }}>
      <Paper elevation={12} sx={{ p: { xs: 4, md: 8 }, borderRadius: 8, background: '#fff', color: '#23243a', boxShadow: '0 16px 64px rgba(30,39,70,0.10)', width: '100%', maxWidth: 600 }}>
        <Typography variant="h3" sx={{ fontWeight: 900, color: '#168f5c', mb: 2, textAlign: 'center' }}>Search Topic</Typography>
        <TextField label="Enter a topic" value={topic} onChange={e => setTopic(e.target.value)} fullWidth margin="normal" sx={{ borderRadius: 4, background: '#f5f7fa', fontSize: 18 }} />
        <Button variant="contained" fullWidth sx={{ mt: 3, background: 'linear-gradient(90deg, #1db954 0%, #1aa260 100%)', color: '#fff', borderRadius: 4, fontWeight: 700, fontSize: 22, boxShadow: '0 4px 16px rgba(30,39,70,0.10)', py: 1.5, '&:hover': { background: 'linear-gradient(90deg, #1aa260 0%, #1db954 100%)', color: '#fff' } }} onClick={handleSearch} disabled={loading}>{loading ? 'Generating...' : 'Generate Quiz'}</Button>
        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
      </Paper>
    </Box>
  );
};

export default TopicSearch;
