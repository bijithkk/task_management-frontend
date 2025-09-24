import axios from "axios";

// Create base axios instance with common configuration
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("ngtoken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and 401
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized: clear token and redirect to login
      localStorage.removeItem("ngtoken");
      window.location.href = "/login";
      return Promise.reject(new Error("Unauthorized: Please login again"));
    }

    if (error.response) {
      const errorMessage =
        error.response.data?.message || error.response.statusText;
      return Promise.reject(
        new Error(`API Error: ${error.response.status} - ${errorMessage}`)
      );
    } else if (error.request) {
      return Promise.reject(new Error("Network Error: No response received"));
    } else {
      return Promise.reject(new Error(`Request Error: ${error.message}`));
    }
  }
);

// Create auth client (no auth token needed)
export const authClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor for auth client
authClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const errorMessage =
        error.response.data?.message || error.response.statusText;
      return Promise.reject(
        new Error(`API Error: ${error.response.status} - ${errorMessage}`)
      );
    } else if (error.request) {
      return Promise.reject(new Error("Network Error: No response received"));
    } else {
      return Promise.reject(new Error(`Request Error: ${error.message}`));
    }
  }
);
