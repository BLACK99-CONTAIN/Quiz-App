import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Paper, Typography, Button, Box, Radio, RadioGroup, FormControlLabel, FormControl, Alert } from '@mui/material';
import Chatbot from './Chatbot';

const QuizAttempt = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [total, setTotal] = useState(null);
  const [error, setError] = useState('');
  const [showAnswers, setShowAnswers] = useState(false);
  const navigate = useNavigate();

  if (user?.role === 'Admin') {
    return <Navigate to="/quizzes" />;
  }

  useEffect(() => {
    fetch(`http://localhost:5000/api/quizzes/${id}`, {
      headers: { Authorization: `Bearer ${user?.token}` }
    })
      .then(res => res.json())
      .then(data => {
        setQuiz(data);
        setAnswers(Array(data.questions.length).fill(null));
      });
  }, [id, user]);

  const handleAnswerChange = (questionIdx, optionIdx) => {
    const updated = [...answers];
    updated[questionIdx] = Number(optionIdx);
    setAnswers(updated);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/attempts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`
        },
        body: JSON.stringify({ quizId: id, answers })
      });
      const data = await response.json();
      if (response.ok) {
        setScore(data.score);
        setTotal(data.total);
      } else {
        setError(data.message || 'Submission failed');
      }
    } catch {
      setError('Network error');
    }
  };

  if (!quiz) return <Typography align="center" sx={{ mt: 8 }}>Loading...</Typography>;
  if (score !== null) return (
    <>
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(120deg, #fffbe6 0%, #fff 100%)',
        }}
      >
        <Box
          sx={{
            width: { xs: '95%', sm: 600 },
            mx: 'auto',
            bgcolor: '#fff',
            borderRadius: 6,
            boxShadow: '0 8px 32px rgba(30,39,70,0.18)',
            p: { xs: 3, sm: 6 },
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              display: 'inline-block',
              px: 6,
              py: 3,
              mb: 3,
              borderRadius: 4,
              background: 'linear-gradient(90deg, #1db954 0%, #fffbe6 100%)',
              color: '#23243a',
              fontWeight: 900,
              fontSize: { xs: 28, sm: 38 },
              boxShadow: '0 4px 24px rgba(30,39,70,0.10)',
              letterSpacing: 1,
            }}
          >
            Your score: {score} / {total}
          </Box>
          {!showAnswers && (
            <Button
              variant="contained"
              sx={{
                mb: 4,
                fontWeight: 700,
                fontSize: 18,
                px: 4,
                py: 1.5,
                borderRadius: 3,
                boxShadow: '0 2px 8px rgba(30,39,70,0.10)',
                background: 'linear-gradient(90deg, #1db954 0%, #fffbe6 100%)',
                color: '#23243a',
                '&:hover': {
                  background: 'linear-gradient(90deg, #fffbe6 0%, #1db954 100%)',
                  color: '#23243a',
                },
              }}
              onClick={() => setShowAnswers(true)}
            >
              View Answers
            </Button>
          )}
          {showAnswers && (
            <Box sx={{ mt: 2 }}>
              {quiz.questions.map((q, idx) => (
                <Box key={idx} sx={{ mb: 3, p: 2, borderRadius: 2, background: '#f5f7fa', color: '#23243a', textAlign: 'left' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: 18 }}>
                    {idx + 1}. {q.questionText}
                  </Typography>
                  {q.options.map((opt, optIdx) => {
                    const isCorrect = optIdx === q.correctAnswer;
                    const isSelected = answers[idx] === optIdx;
                    return (
                      <Box
                        key={optIdx}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mb: 1,
                          pl: 2,
                          py: 0.5,
                          borderRadius: 1,
                          background: isCorrect
                            ? '#1db954'
                            : isSelected
                              ? '#ffd166'
                              : 'transparent',
                          color: isCorrect
                            ? '#fff'
                            : isSelected
                              ? '#23243a'
                              : '#23243a',
                          fontWeight: isCorrect || isSelected ? 700 : 400,
                          fontSize: 16,
                        }}
                      >
                        <span>
                          {optIdx + 1}. {opt}
                          {isCorrect && <span style={{ marginLeft: 8 }}>(Correct)</span>}
                          {isSelected && !isCorrect && <span style={{ marginLeft: 8 }}>(Your choice)</span>}
                        </span>
                      </Box>
                    );
                  })}
                  {!isNaN(answers[idx]) && answers[idx] !== q.correctAnswer && (
                    <Typography color="error" sx={{ ml: 2, fontWeight: 700 }}>
                      Your answer: {q.options[answers[idx]] ?? "No answer"} (Incorrect)
                    </Typography>
                  )}
                  {answers[idx] === q.correctAnswer && (
                    <Typography color="success.main" sx={{ ml: 2, fontWeight: 700 }}>
                      Correct!
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
      <Chatbot quiz={quiz} />
    </>
  );

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(120deg, #fffbe6 0%, #fff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Paper elevation={8} sx={{
        p: { xs: 3, sm: 6 },
        borderRadius: 6,
        background: '#fff',
        color: '#23243a',
        boxShadow: '0 12px 48px rgba(30,39,70,0.10)',
        width: '100%',
        maxWidth: 700,
      }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 700 }}>
          {quiz.title}
        </Typography>
        <form onSubmit={handleSubmit}>
          {quiz.questions.map((q, idx) => (
            <Box key={idx} sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{idx + 1}. {q.questionText}</Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  value={answers[idx]}
                  onChange={e => handleAnswerChange(idx, Number(e.target.value))}
                >
                  {q.options.map((opt, optIdx) => (
                    <FormControlLabel
                      key={optIdx}
                      value={optIdx}
                      control={<Radio required={answers[idx] === null} />}
                      label={opt}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Box>
          ))}
          <Button type="submit" variant="contained" fullWidth sx={{
            mt: 2,
            fontWeight: 600,
            fontSize: 18,
            background: 'linear-gradient(90deg, #1db954 0%, #fffbe6 100%)',
            color: '#23243a',
            borderRadius: 3,
            '&:hover': {
              background: 'linear-gradient(90deg, #fffbe6 0%, #1db954 100%)',
              color: '#23243a',
            },
          }}>
            Submit Quiz
          </Button>
        </form>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </Paper>
    </Box>
  );
};

export default QuizAttempt;