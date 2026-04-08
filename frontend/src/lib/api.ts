const API_BASE = 'http://localhost:8000';

export interface User {
  id: string;
  email: string;
  name: string | null;
  createdAt: string;
}

export async function register(
  email: string,
  password: string,
  name: string,
): Promise<{ user: User }> {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password, name }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Registration failed');
  }

  return data;
}

export async function login(
  email: string,
  password: string,
): Promise<{ user: User }> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Login failed');
  }

  return data;
}

export async function logout(): Promise<void> {
  const res = await fetch(`${API_BASE}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Logout failed');
  }
}