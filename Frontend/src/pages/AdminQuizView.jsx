import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Paper, Typography, Box, Button, List, ListItem, ListItemText } from '@mui/material';

const AdminQuizView = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [quiz, setQuiz] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/quizzes/${id}`, {
      headers: { Authorization: `Bearer ${user?.token}` }
    })
      .then(res => res.json())
      .then(data => setQuiz(data));
  }, [id, user]);

  if (!quiz) return <Typography align="center" sx={{ mt: 8 }}>Loading...</Typography>;

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 6 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 } }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          {quiz.title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Tags: {quiz.tags?.join(', ')}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Questions: {quiz.questions.length}
        </Typography>
        <List>
          {quiz.questions.map((q, idx) => (
            <ListItem key={idx} divider>
              <ListItemText
                primary={
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {idx + 1}. {q.questionText}
                  </Typography>
                }
                secondary={
                  <span>
                    {q.options.map((opt, optIdx) => (
                      <Typography key={optIdx} sx={{ ml: 2 }} component="span" display="block">
                        {optIdx + 1}. {opt} {optIdx === q.correctAnswer && <b style={{ color: '#ffd166' }}> (Correct)</b>}
                      </Typography>
                    ))}
                  </span>
                }
              />
            </ListItem>
          ))}
        </List>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate('/quizzes')}>
          Back to Quizzes
        </Button>
      </Paper>
    </Box>
  );
};

export default AdminQuizView;