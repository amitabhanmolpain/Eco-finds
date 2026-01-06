// API ENDPOINTS REMOVED - USING LOCAL STORAGE ONLY

const SESSION_KEY = 'hc_session';
const TOKEN_KEY = 'access_token';

// Signup function - local storage only (no backend)
export async function signup({ email, display_name, password, confirm_password }) {
  try {
    // Basic validation
    if (password !== confirm_password) {
      window.dispatchEvent(new CustomEvent('hc_toast', { detail: { message: 'Passwords do not match', type: 'error' } }));
      return { success: false, error: 'Passwords do not match' };
    }

    // Store user data locally
    const mockToken = 'local_token_' + Date.now();
    localStorage.setItem(TOKEN_KEY, mockToken);
    localStorage.setItem(SESSION_KEY, JSON.stringify({
      email,
      display_name,
      id: 'user_' + Date.now()
    }));
    window.dispatchEvent(new CustomEvent('hc_toast', { detail: { message: 'Account created successfully!', type: 'success' } }));
    return { success: true };
  } catch (error) {
    window.dispatchEvent(new CustomEvent('hc_toast', { detail: { message: 'Signup failed. Please try again.', type: 'error' } }));
    return { success: false, error: 'Signup failed. Please try again.' };
  }
}

// Login function - local storage only (no backend)
export async function login({ email, password }) {
  try {
    // Mock login - just store in localStorage
    const mockToken = 'local_token_' + Date.now();
    localStorage.setItem(TOKEN_KEY, mockToken);
    localStorage.setItem(SESSION_KEY, JSON.stringify({ 
      email, 
      username: email.split('@')[0],
      display_name: email.split('@')[0],
      id: 'user_' + Date.now()
    }));
    window.dispatchEvent(new CustomEvent('hc_toast', { detail: { message: 'Welcome back!', type: 'success' } }));
    return { success: true };
  } catch (error) {
    window.dispatchEvent(new CustomEvent('hc_toast', { detail: { message: 'Login failed. Please try again.', type: 'error' } }));
    return { success: false, error: 'Login failed. Please try again.' };
  }
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(TOKEN_KEY);
}

export function currentUser() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    const token = localStorage.getItem(TOKEN_KEY);
    
    if (!raw || !token) return null;
    
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

// Check if user is authenticated
export function isAuthenticated() {
  return !!localStorage.getItem(TOKEN_KEY);
}
