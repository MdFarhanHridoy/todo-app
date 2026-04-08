'use client';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { Logout } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Todo App
        </Typography>
        {user ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2">
              Hello, {user.name || user.email}
            </Typography>
            <Button
              color="inherit"
              onClick={handleLogout}
              startIcon={<Logout />}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button color="inherit" onClick={() => router.push('/login')}>
              Login
            </Button>
            <Button color="inherit" onClick={() => router.push('/register')}>
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}