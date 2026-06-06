import apiClient from './apiClient';

export const authService = {
  // 🔐 1. LOGIN: Sends email & password, gets back a security token
  login: async (credentials) => {
    // credentials will look like: { email: '...', password: '...' }
    const response = await apiClient.post('/auth/login', credentials);
    
    // If the server gives us a successful login token, save it in the browser memory
    if (response.data && response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    
    return response.data;
  },

  // 📝 2. REGISTER: Creates a brand new user account
  register: async (userData) => {
    // userData will look like: { name: '...', email: '...', password: '...' }
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },

  // 🚪 3. LOGOUT: Wipes the security token from the browser memory
  logout: () => {
    localStorage.removeItem('auth_token');
    window.location.href = '/login'; // Sends the user back to the login wall screen
  }
};