import { AuthContext } from './context/AuthContext';
import { AppBar, Toolbar, Typography, Box, Container, createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import QuizList from './pages/QuizList';
import QuizAttempt from './pages/QuizAttempt';
import Chatbot from './pages/Chatbot';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import TopicSearch from './pages/TopicSearch';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#ff9800' },
    background: { default: 'linear-gradient(135deg, #23243a 0%, #3a3f5c 100%)' },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: 'Roboto, Inter, Arial, sans-serif',
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Box
        sx={{
          minHeight: 'calc(100vh - 70px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'background.default',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Routes> {/* <-- FIXED: Use Routes, not Router */}
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/topic" element={<TopicSearch />} />
            <Route path="/quizzes" element={<QuizList />} />
            <Route path="/attempt" element={<QuizAttempt />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="*" element={<Box sx={{ textAlign: 'center', mt: 8 }}><Typography variant="h4">404 Not Found</Typography></Box>} />
          </Routes>
        </Box>
      </Box>
      
    </ThemeProvider>
  );
}

export default App;