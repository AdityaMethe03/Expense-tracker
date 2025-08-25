
const BASE_URL = "http://localhost:3000/api/v1";

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

// ... your signup function