import { AuthContext } from './context/AuthContext';
import { AppBar, Toolbar, Typography, Box, Container, createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import QuizList from './pages/QuizList';
import QuizDetail from './pages/QuizDetail';
import QuizAttempt from './pages/QuizAttempt';
import AdminPanel from './pages/AdminPanel';
import Chatbot from './pages/Chatbot';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import AdminQuizView from './pages/AdminQuizView';
import AdminQuizEdit from './pages/AdminQuizEdit';

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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/quizzes" element={<PrivateRoute><QuizList /></PrivateRoute>} />
            <Route path="/quizzes/:id" element={<PrivateRoute><QuizDetail /></PrivateRoute>} />
            <Route path="/attempt/:id" element={<PrivateRoute><QuizAttempt /></PrivateRoute>} />
            <Route path="/admin" element={<PrivateRoute role="Admin"><AdminPanel /></PrivateRoute>} />
            <Route path="/chatbot" element={<PrivateRoute><Chatbot /></PrivateRoute>} />
            <Route path="/admin/view/:id" element={<PrivateRoute role="Admin"><AdminQuizView /></PrivateRoute>} />
            <Route path="/admin/edit/:id" element={<PrivateRoute role="Admin"><AdminQuizEdit /></PrivateRoute>} />
            <Route path="*" element={<Box sx={{ textAlign: 'center', mt: 8 }}><Typography variant="h4">404 Not Found</Typography></Box>} />
          </Routes>
        </Box>
      </Box>
      
    </ThemeProvider>
  );
}

export default App;