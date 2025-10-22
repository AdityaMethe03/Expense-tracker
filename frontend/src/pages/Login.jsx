import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/useAuth";
import { login as loginApi } from "../services/apiAuth";
import { getErrorMessage } from "../utils/errorHandler";
import {
  ArrowRightStartOnRectangleIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/solid";

function Login() {
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("test1234");
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const {
    mutate: login,
    isPending,
  } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      // Show success toast
      toast.success(`Welcome back, ${data.data.user.name}!`);
      // Update auth state
      authLogin({ user: data.data.user, token: data.token });
      // Navigate to dashboard
      navigate("/app", { replace: true });
    },
    onError: (err) => {
      // Get user-friendly error message
      const errorMessage = getErrorMessage(err);
      // Show error toast
      toast.error(errorMessage);
      console.error("Login failed:", err.message);
    },
  });

  function handleSubmit(e) {
    e.preventDefault();

    // Client-side validation
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Proceed with login
    login({ email, password });
  }

  return (
    <section className="my-16">
      <form
        onSubmit={handleSubmit}
        className="mx-auto p-10 rounded-lg max-w-lg flex flex-col gap-6 shadow-lg bg-white"
      >
        <h2 className="flex flex-row items-center justify-center gap-1 text-3xl font-bold text-center text-text-header">
          Welcome Back <FaceSmileIcon className="w-8 h-8 text-accent-salmon" />
        </h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-lg">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            disabled={isPending}
            className="p-3 rounded-md bg-bg-primary border-2 border-transparent focus:outline-none focus:border-brand-primary"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password-input" className="text-lg">
            Password
          </label>
          <input
            type="password"
            id="password-input"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            disabled={isPending}
            className="p-3 rounded-md bg-bg-primary border-2 border-transparent focus:outline-none focus:border-brand-primary"
          />
        </div>

        <div className="flex items-center justify-center mt-3">
          <button
            disabled={isPending}
            className="w-full py-3 text-lg rounded-lg shadow-md font-bold text-text-on-brand bg-brand-primary hover:bg-brand-600 transition-colors duration-300 disabled:bg-gray-400"
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </div>

        <div className="">
          <Link
            to="/register"
            className="flex items-center justify-center mt-2 hover:text-text-header"
          >
            Don't have an account? Register
            <ArrowRightStartOnRectangleIcon className="w-6 h-6 hover:text-text-header" />
          </Link>
        </div>
      </form>
    </section>
  );
}

export default Login;
