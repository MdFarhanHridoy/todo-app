'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Link as MuiLink,
} from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey.100',
      }}
    >
      <Card sx={{ maxWidth: 400, width: '100%', mx: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
            Login
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
            Welcome back! Please sign in to continue.
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
              startIcon={<LoginIcon />}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </Box>

          <Typography variant="body2" align="center">
            Don't have an account?{' '}
            <MuiLink component={Link} href="/register" underline="hover">
              Register here
            </MuiLink>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}