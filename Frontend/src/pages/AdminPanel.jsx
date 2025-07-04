import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  Box,
  Paper,
  Typography,
  Divider,
  Card,
  CardContent,
} from '@mui/material';
import CreateQuizForm from '../components/CreateQuizForm';

const AdminPanel = () => {
  const { user } = useContext(AuthContext);

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
      <Paper
        elevation={16}
        sx={{
          p: { xs: 4, md: 8, xl: 12 },
          borderRadius: 8,
          background: 'linear-gradient(120deg, #fff 60%, #fffbe6 100%)',
          color: '#23243a',
          boxShadow: '0 24px 96px rgba(30,39,70,0.13)',
          width: '100%',
          maxWidth: 1400,
          mx: 'auto',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            mb: 2,
            color: '#168f5c',
            letterSpacing: 2,
            fontFamily: 'Poppins, Inter, Arial, sans-serif',
            textAlign: 'center',
          }}
        >
          Admin Panel
        </Typography>
        <Divider sx={{ mb: 4 }} />
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 10,
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}>
          {/* Create Quiz Card */}
          <Card
            elevation={8}
            sx={{
              flex: 1.2,
              borderRadius: 6,
              background: 'linear-gradient(120deg, #fff 80%, #eafff1 100%)',
              boxShadow: '0 8px 32px rgba(30,39,70,0.10)',
              p: { xs: 2, md: 4 },
              minWidth: 340,
              maxWidth: 600,
              mx: 'auto',
              mb: { xs: 4, md: 0 },
              transition: 'box-shadow 0.3s',
              '&:hover': {
                boxShadow: '0 16px 48px rgba(30,39,70,0.18)',
              },
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: '#23243a',
                  mb: 3,
                  letterSpacing: 1,
                  textAlign: 'left',
                  fontFamily: 'Poppins, Inter, Arial, sans-serif',
                }}
              >
                Create Quiz
              </Typography>
              <CreateQuizForm />
            </CardContent>
          </Card>
          {/* SVG Illustration */}
          <Box
            sx={{
              flex: 1,
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 800,
            }}
          >
            <Box
              sx={{
                width: { md: 340, lg: 420, xl: 520 },
                height: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(120deg, #eafff1 0%, #fff 100%)',
                borderRadius: 6,
                boxShadow: '0 4px 24px rgba(30,39,70,0.08)',
                p: 2,
              }}
            >
              <img
                src="/admin-illustration.svg"
                alt="Admin Illustration"
                style={{
                  width: '100%',
                  maxWidth: 420,
                  minWidth: 220,
                  height: 'auto',
                  opacity: 0.96,
                  display: 'block',
                  margin: '50 auto',
                  filter: 'drop-shadow(0 4px 16px #eafff1)',
                }}
              />
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AdminPanel;
