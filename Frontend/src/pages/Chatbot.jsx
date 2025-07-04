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
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(120deg, #fffbe6 0%, #fff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Poppins, Inter, Arial, sans-serif',
      py: 8,
    }}>
      <Paper elevation={16} sx={{
        p: { xs: 4, md: 10, xl: 16 },
        borderRadius: 8,
        background: 'linear-gradient(120deg, #fff 60%, #eafff1 100%)',
        color: '#23243a',
        boxShadow: '0 24px 96px rgba(30,39,70,0.13)',
        width: '100%',
        maxWidth: 1200,
        minHeight: { xs: 500, md: 700 },
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <Typography variant="h3" gutterBottom sx={{
          fontWeight: 900,
          color: '#168f5c',
          mb: 4,
          textAlign: 'center',
          letterSpacing: 2,
        }}>
          Quiz Chatbot
        </Typography>
        <Box sx={{
          flex: 1,
          minHeight: 400,
          mb: 4,
          overflowY: 'auto',
          px: 2,
          bgcolor: '#f5f7fa',
          borderRadius: 4,
          boxShadow: '0 2px 12px rgba(30,39,70,0.06)',
        }}>
          {messages.length === 0 && (
            <Typography sx={{ color: '#888', mt: 8, textAlign: 'center', fontSize: 22 }}>
              Ask anything about your quiz!
            </Typography>
          )}
          {messages.map((msg, idx) => (
            <Typography
              key={idx}
              align={msg.from === 'user' ? 'right' : 'left'}
              sx={{
                mb: 3,
                fontSize: 22,
                color: msg.from === 'user' ? '#1db954' : '#23243a',
                fontWeight: msg.from === 'user' ? 700 : 500,
                background: msg.from === 'user'
                  ? 'linear-gradient(90deg, #eafff1 0%, #fff 100%)'
                  : 'none',
                borderRadius: 3,
                px: 2,
                py: 1,
                display: 'inline-block',
                maxWidth: '80%',
                ml: msg.from === 'user' ? 'auto' : 0,
                mr: msg.from === 'user' ? 0 : 'auto',
                boxShadow: msg.from === 'user'
                  ? '0 2px 8px rgba(30,39,70,0.07)'
                  : 'none',
              }}
            >
              <b>{msg.from === 'user' ? 'You' : 'Bot'}:</b> {msg.text}
            </Typography>
          ))}
          {loading && <CircularProgress size={32} sx={{ mt: 2, display: 'block', mx: 'auto' }} />}
        </Box>
        <Box sx={{ display: 'flex', gap: 3, mt: 2 }}>
          <TextField
            value={input}
            onChange={e => setInput(e.target.value)}
            fullWidth
            placeholder="Ask about your quiz..."
            disabled={loading}
            sx={{
              bgcolor: '#f5f7fa',
              borderRadius: 4,
              fontSize: 22,
              '& .MuiInputBase-input': { fontSize: 22 },
              boxShadow: '0 2px 8px rgba(30,39,70,0.06)',
            }}
            InputProps={{
              style: { color: '#23243a' }
            }}
          />
          <Button
            variant="contained"
            onClick={sendMessage}
            disabled={loading}
            sx={{
              minWidth: 160,
              fontSize: 22,
              fontWeight: 800,
              borderRadius: 4,
              background: 'linear-gradient(90deg, #1db954 0%, #fffbe6 100%)',
              color: '#23243a',
              boxShadow: '0 2px 12px rgba(30,39,70,0.10)',
              px: 4,
              py: 1.5,
              '&:hover': {
                background: 'linear-gradient(90deg, #fffbe6 0%, #1db954 100%)',
                color: '#23243a',
              },
            }}
          >
            Send
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Chatbot;