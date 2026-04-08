'use client';

import { Box, Typography, Button, Paper } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { CheckCircle } from '@mui/icons-material';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          gap: 3,
        }}
      >
        <Paper elevation={3} sx={{ p: 6, textAlign: 'center', maxWidth: 500 }}>
          <CheckCircle sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            Welcome to Todo App
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Please sign in to manage your todos.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => router.push('/login')}
            >
              Sign In
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => router.push('/register')}
            >
              Create Account
            </Button>
          </Box>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Paper elevation={2} sx={{ p: 4, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Welcome back, {user.name || user.email}! 👋
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Your todo list will appear here. Start adding your tasks!
        </Typography>
      </Paper>
    </Box>
  );
}