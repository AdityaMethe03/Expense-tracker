import { useState } from "react";
import { register as registerApi } from "../services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../contexts/useAuth";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRightStartOnRectangleIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline";

function Register() {
  const [name, setName] = useState("test");
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("test1234");
  const [passwordConfirm, setPasswordConfirm] = useState("test1234");
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const {
    mutate: register,
    isPending,
    error,
  } = useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      authLogin({ user: data.data.user, token: data.token });
      navigate("/app", { replace: true });
    },
    onError: (err) => {
      console.error("Register failed:", err.message);
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log({ name, email, password, passwordConfirm });
    if (
      (!email || !password || !passwordConfirm) &&
      password != passwordConfirm
    ) {
      alert("Passwords do not match!");
      return;
    }
    register({ name, email, password, passwordConfirm });
  }

  return (
    <section className="my-16">
      <form
        onSubmit={handleSubmit}
        className="mx-auto p-10 rounded-lg max-w-lg flex flex-col gap-6 shadow-lg bg-white"
      >
        <h2 className="flex flex-row items-center justify-center gap-1 text-3xl font-bold text-center text-text-header">
          Welcome <FaceSmileIcon className="w-8 h-8 text-accent-salmon" />
        </h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="text-input" className="text-lg">
            Name
          </label>
          <input
            type="text"
            id="text-input"
            onChange={(e) => setName(e.target.value)}
            value={name}
            disabled={isPending}
            className="p-3 rounded-md bg-bg-primary border-2 border-transparent focus:outline-none focus:border-brand-primary"
          />
        </div>
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
        <div className="flex flex-col gap-2">
          <label htmlFor="passwordConfirm-input" className="text-lg">
            Password Confirm
          </label>
          <input
            type="password"
            id="passwordConfirm-input"
            onChange={(e) => setPasswordConfirm(e.target.value)}
            value={passwordConfirm}
            disabled={isPending}
            className="p-3 rounded-md bg-bg-primary border-2 border-transparent focus:outline-none focus:border-brand-primary"
          />
        </div>

        {error && (
          <p className="text-feedback-error text-center text-sm">
            {error.message}
          </p>
        )}

        <div className="flex items-center justify-center mt-3">
          <button
            disabled={isPending}
            className="w-full py-3 text-lg rounded-lg shadow-md font-bold text-text-on-brand bg-brand-primary hover:bg-brand-600 transition-colors duration-300 disabled:bg-gray-400"
          >
            {isPending ? "Creating account..." : "Create account"}
          </button>
        </div>

        <div className="">
          <Link
            to="/login"
            className="flex items-center justify-center mt-2 hover:text-text-header"
          >
            Already have an account? Login
            <ArrowRightStartOnRectangleIcon className="w-6 h-6 hover:text-text-header" />
          </Link>
        </div>
      </form>
    </section>
  );
}

export default Register;
