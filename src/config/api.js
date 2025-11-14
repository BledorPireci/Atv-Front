// API Configuration
// This will automatically use the correct backend URL based on environment

const API_CONFIG = {
  // Development: Uses localhost
  // Production: Uses Render backend
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  apiPath: '/api',
};

// Full API URL
export const API_BASE_URL = `${API_CONFIG.baseURL}${API_CONFIG.apiPath}`;

// Backend URL (for file uploads, etc.)
export const BACKEND_URL = API_CONFIG.baseURL;

// Helper function for making authenticated requests
export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    ...options.headers,
  };

  // Only add Content-Type if not FormData (FormData sets its own Content-Type)
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return fetch(url, {
    ...options,
    headers,
  });
};

export default API_CONFIG;

