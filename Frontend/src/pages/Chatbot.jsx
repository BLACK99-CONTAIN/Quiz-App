import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, CircularProgress } from '@mui/material';

const Chatbot = ({ quiz }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: 'user', text: input }]);
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/chatbot/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quiz, userQuestion: input })
      });
      const data = await res.json();
      setMessages(msgs => [...msgs, { from: 'bot', text: data.answer }]);
    } catch {
      setMessages(msgs => [...msgs, { from: 'bot', text: 'Sorry, something went wrong.' }]);
    }
    setInput('');
    setLoading(false);
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 8, width: '100%' }}>
      <Paper elevation={8} sx={{
        p: { xs: 3, sm: 6 },
        borderRadius: 6,
        background: 'linear-gradient(135deg, #23243a 0%,rgb(3, 0, 6) 100%)',
        color: '#f5f7fa',
        boxShadow: '0 12px 48px rgba(30,39,70,0.25)',
        width: '100%',
        minHeight: 500,
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: '#ffd166' }}>
          Quiz Chatbot
        </Typography>
        <Box sx={{ flex: 1, minHeight: 320, mb: 2, overflowY: 'auto' }}>
          {messages.map((msg, idx) => (
            <Typography key={idx} align={msg.from === 'user' ? 'right' : 'left'} sx={{ mb: 1 }}>
              <b>{msg.from === 'user' ? 'You' : 'Bot'}:</b> {msg.text}
            </Typography>
          ))}
          {loading && <CircularProgress size={24} />}
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            value={input}
            onChange={e => setInput(e.target.value)}
            fullWidth
            placeholder="Ask about your quiz..."
            disabled={loading}
            sx={{ bgcolor: '#fff', borderRadius: 2 }}
            InputProps={{
              style: { color: '#23243a' }
            }}
          />
          <Button variant="contained" onClick={sendMessage} disabled={loading} sx={{ minWidth: 100 }}>
            Send
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Chatbot;