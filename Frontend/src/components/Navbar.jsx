import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(90deg, #168f5c 0%, #fff 100%)',
        color: '#23243a',
        boxShadow: '0 8px 24px 0 rgba(30,39,70,0.10)',
        width: '100%',
        zIndex: 1000,
        minHeight: 64,
      }}
    >
      <Toolbar
        sx={{
          minHeight: 64,
          px: { xs: 2, md: 6 },
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="h5"
          component={RouterLink}
          to="/topic"
          sx={{
            fontWeight: 900,
            textDecoration: 'none',
            color: '#23243a',
            letterSpacing: 2,
            fontFamily: 'Poppins, Inter, Arial, sans-serif',
            fontSize: { xs: 22, md: 28, xl: 36 },
            transition: 'color 0.2s, text-shadow 0.2s',
            '&:hover': {
              color: '#168f5c',
              textShadow: '0 2px 8px #fffbe6',
            },
          }}
        >
          Quiz App
        </Typography>
        <Box sx={{ display: 'flex', gap: { xs: 0.5, md: 2 } }}>
          <Button
            component={RouterLink}
            to="/quizzes"
            color="inherit"
            sx={{
              fontWeight: 700,
              fontSize: { xs: 14, md: 18, xl: 22 },
              letterSpacing: 1,
              mx: 0.5,
              color: location.pathname.startsWith('/quizzes') ? '#168f5c' : '#23243a',
              transition: 'color 0.2s, font-size 0.2s',
              '&:hover': {
                color: '#168f5c',
              },
            }}
          >
            Quizzes
          </Button>
          {user?.role === 'Admin' && (
            <Button
              component={RouterLink}
              to="/admin"
              color="inherit"
              sx={{
                fontWeight: 700,
                fontSize: { xs: 14, md: 18, xl: 22 },
                letterSpacing: 1,
                mx: 0.5,
                color: location.pathname.startsWith('/admin') ? '#168f5c' : '#23243a',
                transition: 'color 0.2s, font-size 0.2s',
                '&:hover': {
                  color: '#168f5c',
                },
              }}
            >
              Admin Panel
            </Button>
          )}
          {user ? (
            <Button
              onClick={logout}
              color="inherit"
              sx={{
                fontWeight: 700,
                fontSize: { xs: 14, md: 18, xl: 22 },
                letterSpacing: 1,
                mx: 0.5,
                color: '#23243a',
                transition: 'color 0.2s, font-size 0.2s',
                '&:hover': {
                  color: '#168f5c',
                },
              }}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                component={RouterLink}
                to="/login"
                color="inherit"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: 14, md: 18, xl: 22 },
                  letterSpacing: 1,
                  mx: 0.5,
                  color: location.pathname === '/login' ? '#168f5c' : '#23243a',
                  transition: 'color 0.2s, font-size 0.2s',
                  '&:hover': {
                    color: '#168f5c',
                  },
                }}
              >
                Login
              </Button>
              <Button
                component={RouterLink}
                to="/register"
                color="inherit"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: 14, md: 18, xl: 22 },
                  letterSpacing: 1,
                  mx: 0.5,
                  color: location.pathname === '/register' ? '#168f5c' : '#23243a',
                  transition: 'color 0.2s, font-size 0.2s',
                  '&:hover': {
                    color: '#168f5c',
                  },
                }}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;