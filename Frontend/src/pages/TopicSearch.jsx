import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, TextField, Button } from '@mui/material';

const TopicSearch = () => {
  const [topic, setTopic] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!topic.trim()) return;
    const res = await fetch(`https://your-backend-url/api/quizzes/search?topic=${encodeURIComponent(topic)}`);
    const quizzes = await res.json();
    if (Array.isArray(quizzes) && quizzes.length > 0) {
      localStorage.setItem('topicQuizzes', JSON.stringify(quizzes));
      navigate('/quizzes');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(120deg, #fffbe6 0%, #fff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Poppins, Inter, Arial, sans-serif' }}>
      <Paper elevation={12} sx={{ p: { xs: 4, md: 8 }, borderRadius: 8, background: '#fff', color: '#23243a', boxShadow: '0 16px 64px rgba(30,39,70,0.10)', width: '100%', maxWidth: 600 }}>
        <Typography variant="h3" sx={{ fontWeight: 900, color: '#168f5c', mb: 2, textAlign: 'center' }}>Search Topic</Typography>
        <TextField label="Enter a topic" value={topic} onChange={e => setTopic(e.target.value)} fullWidth margin="normal" sx={{ borderRadius: 4, background: '#f5f7fa', fontSize: 18 }} />
        <Button variant="contained" fullWidth sx={{ mt: 3, background: 'linear-gradient(90deg, #1db954 0%, #1aa260 100%)', color: '#fff', borderRadius: 4, fontWeight: 700, fontSize: 22, boxShadow: '0 4px 16px rgba(30,39,70,0.10)', py: 1.5, '&:hover': { background: 'linear-gradient(90deg, #1aa260 0%, #1db954 100%)', color: '#fff' } }} onClick={handleSearch}>Find Quizzes</Button>
      </Paper>
    </Box>
  );
};

export default TopicSearch;