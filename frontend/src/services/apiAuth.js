// frontend/src/services/apiAuth.js

import { api } from "./apiClient";

export async function login({ email, password }) {
    return api.post("/users/login", { email, password });
}

export async function register({ name, email, password, passwordConfirm }) {
    return api.post("/users/signup", { name, email, password, passwordConfirm });
}

export async function logout() {
    return api.post("/users/logout");
}