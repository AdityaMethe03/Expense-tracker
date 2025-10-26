// frontend/src/services/apiClient.js

import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

// Create axios instance with the default config
const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, // 10-second timeout
    withCredentials: true, // Send cookies with requests
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor - Add a token to every request
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Handle errors globally
apiClient.interceptors.response.use(
    (response) => {
        // Return just the data
        return response.data;
    },
    (error) => {
        // Handle different error scenarios
        // console.log("Error:", error);

        if (error.response) {
            // Server responded with error status
            const errorMessage = error.response.data?.message || error.message;
            const statusCode = error.response.status;

            const customError = new Error(errorMessage);
            customError.statusCode = statusCode;
            customError.data = error.response.data;

            return Promise.reject(customError);
        } else if (error.request) {
            // Request made but no response received
            console.log("Network Error:", error.request);
            return Promise.reject(new Error("Network error. Please check your internet connection."));
        } else {
            // Something else happened
            console.log("Error:", error.message);
            return Promise.reject(new Error(error.message || "An unexpected error occurred."));
        }
    }
);

/**
 * Helper functions for common HTTP methods
 */
export const api = {
    get: (url, config = {}) => {
        return apiClient.get(url, config);
    },

    post: (url, data, config = {}) => {
        return apiClient.post(url, data, config);
    },

    patch: (url, data, config = {}) => {
        return apiClient.patch(url, data, config);
    },

    put: (url, data, config = {}) => {
        return apiClient.put(url, data, config);
    },

    delete: (url, config = {}) => {
        return apiClient.delete(url, config);
    },
};

export default apiClient;