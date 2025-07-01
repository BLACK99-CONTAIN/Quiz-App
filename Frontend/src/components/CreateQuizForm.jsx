import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

const CreateQuizForm = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([{ questionText: "", options: ["", ""], correctAnswer: 0 }]);
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleQuestionChange = (idx, field, value) => {
    const updated = [...questions];
    if (field === "questionText") updated[idx][field] = value;
    else if (field === "options") updated[idx].options = value;
    else if (field === "correctAnswer") updated[idx][field] = Number(value);
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, { questionText: "", options: ["", ""], correctAnswer: 0 }]);
  };

  const handleOptionChange = (qIdx, optIdx, value) => {
    const updated = [...questions];
    updated[qIdx].options[optIdx] = value;
    setQuestions(updated);
  };

  const addOption = (qIdx) => {
    const updated = [...questions];
    updated[qIdx].options.push("");
    setQuestions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch("http://localhost:5000/api/quizzes", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify({
          title,
          questions,
          tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Quiz created!");
        setTitle("");
        setQuestions([{ questionText: "", options: ["", ""], correctAnswer: 0 }]);
        setTags("");
      } else {
        setError(data.message || "Failed to create quiz");
      }
    } catch {
      setError("Network error");
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Create Quiz</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Quiz Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Tags (comma separated)"
          value={tags}
          onChange={e => setTags(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        {questions.map((q, idx) => (
          <Box key={idx} sx={{ mb: 2, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
            <TextField
              label={`Question ${idx + 1}`}
              value={q.questionText}
              onChange={e => handleQuestionChange(idx, "questionText", e.target.value)}
              fullWidth
              required
              sx={{ mb: 1 }}
            />
            {q.options.map((opt, optIdx) => (
              <TextField
                key={optIdx}
                label={`Option ${optIdx + 1}`}
                value={opt}
                onChange={e => handleOptionChange(idx, optIdx, e.target.value)}
                required
                sx={{ mb: 1, mr: 1 }}
              />
            ))}
            <Button onClick={() => addOption(idx)} sx={{ mb: 1 }}>Add Option</Button>
            <TextField
              label="Correct Answer (option number, starting from 1)"
              type="number"
              value={q.correctAnswer + 1}
              onChange={e => handleQuestionChange(idx, "correctAnswer", e.target.value - 1)}
              inputProps={{ min: 1, max: q.options.length }}
              sx={{ mb: 1, ml: 2, width: 220 }}
              required
            />
          </Box>
        ))}
        <Button onClick={addQuestion} sx={{ mb: 2 }}>Add Question</Button>
        <Box>
          <Button type="submit" variant="contained" color="primary">Create Quiz</Button>
        </Box>
        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
        {success && <Typography color="primary" sx={{ mt: 2 }}>{success}</Typography>}
      </form>
    </Paper>
  );
};

export default CreateQuizForm;