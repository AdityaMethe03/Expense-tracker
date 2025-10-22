// frontend/src/services/apiClient.js

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

/**
 * Centralized API request handler
 * Automatically adds Authorization header if token exists
 */
export async function apiRequest(endpoint, options = {}) {
    // Get token from localStorage
    const token = localStorage.getItem("token");

    // Build headers
    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
    };

    // Add Authorization header if token exists
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    // Build request config
    const config = {
        ...options,
        headers,
        credentials: "include", // Still include cookies for backup
    };

    try {
        const res = await fetch(`${BASE_URL}${endpoint}`, config);

        // Try to parse JSON response
        let data;
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            data = await res.json();
        }

        // If response is not ok, throw error
        if (!res.ok) {
            throw new Error(data?.message || `${res.statusText}`);
        }

        return data;
    } catch (error) {
        // Re-throw with better error message
        throw new Error(error.message || "Network request failed");
    }
}

/**
 * Helper functions for common HTTP methods
 */
export const api = {
    get: (endpoint, options = {}) => {
        return apiRequest(endpoint, {
            ...options,
            method: "GET",
        });
    },

    post: (endpoint, body, options = {}) => {
        return apiRequest(endpoint, {
            ...options,
            method: "POST",
            body: JSON.stringify(body),
        });
    },

    patch: (endpoint, body, options = {}) => {
        return apiRequest(endpoint, {
            ...options,
            method: "PATCH",
            body: JSON.stringify(body),
        });
    },

    delete: (endpoint, options = {}) => {
        return apiRequest(endpoint, {
            ...options,
            method: "DELETE",
        });
    },
};