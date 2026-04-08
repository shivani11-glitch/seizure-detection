const API_BASE = 'http://localhost:5000/api';

function getToken() {
  return localStorage.getItem('ng_token');
}

function getUser() {
  const u = localStorage.getItem('ng_user');
  return u ? JSON.parse(u) : null;
}

function saveAuth(token, user) {
  localStorage.setItem('ng_token', token);
  localStorage.setItem('ng_user', JSON.stringify(user));
}

function logout() {
  localStorage.removeItem('ng_token');
  localStorage.removeItem('ng_user');
  window.location.href = '../index.html';
}

function requireAuth() {
  if (!getToken()) {
    window.location.href = '../index.html';
  }
}

async function apiFetch(endpoint, options = {}) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(API_BASE + endpoint, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}
