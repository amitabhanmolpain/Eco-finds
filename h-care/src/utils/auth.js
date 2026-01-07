// Backend API configuration
const API_URL = 'http://localhost:8000/api/auth';
const TOKEN_KEY = 'token';

// Signup function - calls backend API
export async function signup({ email, display_name, password, confirm_password }) {
  try {
    // Basic validation
    if (password !== confirm_password) {
      window.dispatchEvent(new CustomEvent('hc_toast', { detail: { message: 'Passwords do not match', type: 'error' } }));
      return { success: false, error: 'Passwords do not match' };
    }

    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, display_name, password }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      // Only store token, user data will be fetched from backend
      localStorage.setItem(TOKEN_KEY, data.token);
      window.dispatchEvent(new CustomEvent('hc_toast', { detail: { message: 'Account created successfully!', type: 'success' } }));
      return { success: true };
    } else {
      window.dispatchEvent(new CustomEvent('hc_toast', { detail: { message: data.error || 'Signup failed', type: 'error' } }));
      return { success: false, error: data.error || 'Signup failed' };
    }
  } catch (error) {
    console.error('Signup error:', error);
    window.dispatchEvent(new CustomEvent('hc_toast', { detail: { message: 'Connection error. Please check if the server is running.', type: 'error' } }));
    return { success: false, error: 'Connection error. Please check if the server is running.' };
  }
}

// Login function - calls backend API
export async function login({ email, password }) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      // Only store token, user data will be fetched from backend
      localStorage.setItem(TOKEN_KEY, data.token);
      window.dispatchEvent(new CustomEvent('hc_toast', { detail: { message: 'Welcome back!', type: 'success' } }));
      return { success: true };
    } else {
      window.dispatchEvent(new CustomEvent('hc_toast', { detail: { message: data.error || 'Login failed', type: 'error' } }));
      return { success: false, error: data.error || 'Login failed' };
    }
  } catch (error) {
    console.error('Login error:', error);
    window.dispatchEvent(new CustomEvent('hc_toast', { detail: { message: 'Connection error. Please check if the server is running.', type: 'error' } }));
    return { success: false, error: 'Connection error. Please check if the server is running.' };
  }
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

// Fetch current user from backend API (MongoDB)
export async function currentUser() {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    
    if (!token) return null;

    const response = await fetch(`${API_URL}/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    
    if (response.ok && data.success) {
      return data.user;
    }
    
    // If token is invalid (401), clear it
    if (response.status === 401 || !data.success) {
      localStorage.removeItem(TOKEN_KEY);
    }
    
    return null;
  } catch (e) {
    console.error('Error fetching user:', e);
    return null;
  }
}

// Check if user is authenticated (token exists)
export function isAuthenticated() {
  return !!localStorage.getItem(TOKEN_KEY);
}
