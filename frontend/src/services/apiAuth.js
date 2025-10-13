
const BASE_URL = import.meta.env.VITE_API_URL;

export async function login({ email, password }) {
    const res = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
        // Throws an error that TanStack Query will catch
        throw new Error(data.message || "Failed to login");
    }

    return data;
}

export async function register({ name, email, password, passwordConfirm }) {
    const res = await fetch(`${BASE_URL}/users/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, passwordConfirm }),
    });

    const data = await res.json();

    if (!res.ok) {
        // Throws an error that TanStack Query will catch
        throw new Error(data.message || "Failed to register");
    }

    return data;
}

export async function logout() {
    const res = await fetch(`${BASE_URL}/users/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        }
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to logout");
    }

    return data;
}