import React, { useContext } from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(90deg,rgb(0, 0, 4) 0%, #8b0000 100%)',
        color: '#ffd166',
        boxShadow: '0 8px 32px 0 rgba(139,0,0,0.7)',
        width: '100%',
        zIndex: 1000,
      }}
    >
      <Toolbar sx={{ minHeight: 90, px: 8, display: 'flex', justifyContent: 'space-between' }}>
        <Button
          component={RouterLink}
          to={user ? "/dashboard" : "/"}
          color="inherit"
          sx={{
            fontWeight: 900,
            letterSpacing: 2,
            textAlign: 'center',
            fontSize: 36,
            textShadow: '2px 2px 8px #000',
            transition: 'color 0.3s, font-size 0.3s',
            '&:hover': {
              color: '#fff',
              fontSize: 42,
            },
          }}
        >
          Quiz App
        </Button>
        <div>
          <Button
            component={RouterLink}
            to="/quizzes"
            color="inherit"
            sx={{
              fontWeight: 700,
              fontSize: 28,
              letterSpacing: 1,
              textShadow: '2px 2px 8px #000',
              mx: 2,
              background: 'none', // remove any background
              boxShadow: 'none',  // remove any shadow
              '&:hover': {
                color: '#ffd166',
                fontSize: 34,
                background: 'none', // ensure no background on hover
                boxShadow: 'none',
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
                color: location.pathname === '/admin' ? '#ffd166' : '#fff',
                fontWeight: 700,
                fontSize: 28,
                letterSpacing: 1,
                textShadow: '2px 2px 8px #000',
                mx: 2,
                transition: 'color 0.3s, font-size 0.3s',
                '&:hover': {
                  color: '#ff1744',
                  fontSize: 34,
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
                fontSize: 28,
                letterSpacing: 1,
                textShadow: '2px 2px 8px #000',
                mx: 2,
                transition: 'color 0.3s, font-size 0.3s',
                '&:hover': {
                  color: '#ffd166',
                  fontSize: 34,
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
                  fontSize: 28,
                  letterSpacing: 1,
                  textShadow: '2px 2px 8px #000',
                  mx: 2,
                  transition: 'color 0.3s, font-size 0.3s',
                  '&:hover': {
                    color: '#ffd166',
                    fontSize: 34,
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
                  fontSize: 28,
                  letterSpacing: 1,
                  textShadow: '2px 2px 8px #000',
                  mx: 2,
                  transition: 'color 0.3s, font-size 0.3s',
                  '&:hover': {
                    color: '#ffd166',
                    fontSize: 34,
                  },
                }}
              >
                Register
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;