import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Paper, Typography, Box, Button, TextField } from '@mui/material';

const AdminQuizEdit = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [quiz, setQuiz] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/quizzes/${id}`, {
      headers: { Authorization: `Bearer ${user?.token}` }
    })
      .then(res => res.json())
      .then(data => setQuiz(data));
  }, [id, user]);

  const handleQuestionChange = (idx, field, value) => {
    const updated = { ...quiz };
    if (field === "questionText") updated.questions[idx][field] = value;
    setQuiz(updated);
  };

  const handleOptionChange = (qIdx, optIdx, value) => {
    const updated = { ...quiz };
    updated.questions[qIdx].options[optIdx] = value;
    setQuiz(updated);
  };

  const handleCorrectChange = (qIdx, value) => {
    const updated = { ...quiz };
    updated.questions[qIdx].correctAnswer = Number(value);
    setQuiz(updated);
  };

  const handleSave = async () => {
    setError('');
    try {
      const res = await fetch(`http://localhost:5000/api/quizzes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`
        },
        body: JSON.stringify({
          title: quiz.title,
          tags: quiz.tags,
          questions: quiz.questions
        })
      });
      if (res.ok) {
        navigate('/quizzes');
      } else {
        const data = await res.json();
        setError(data.message || 'Update failed');
      }
    } catch {
      setError('Network error');
    }
  };

  if (!quiz) return <Typography align="center" sx={{ mt: 8 }}>Loading...</Typography>;

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 6 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 } }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          Edit Quiz: {quiz.title}
        </Typography>
        {quiz.questions.map((q, idx) => (
          <Box key={idx} sx={{ mb: 3 }}>
            <TextField
              label={`Question ${idx + 1}`}
              value={q.questionText}
              onChange={e => handleQuestionChange(idx, "questionText", e.target.value)}
              fullWidth
              sx={{ mb: 1 }}
            />
            {q.options.map((opt, optIdx) => (
              <TextField
                key={optIdx}
                label={`Option ${optIdx + 1}`}
                value={opt}
                onChange={e => handleOptionChange(idx, optIdx, e.target.value)}
                sx={{ mb: 1, mr: 1 }}
              />
            ))}
            <TextField
              label="Correct Answer (option number, starting from 1)"
              type="number"
              value={q.correctAnswer + 1}
              onChange={e => handleCorrectChange(idx, e.target.value - 1)}
              inputProps={{ min: 1, max: q.options.length }}
              sx={{ mb: 1, ml: 2, width: 220 }}
            />
          </Box>
        ))}
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Changes
        </Button>
        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
      </Paper>
    </Box>
  );
};

export default AdminQuizEdit;