import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/useAuth";
import { login as loginApi } from "../services/apiAuth";

function Login() {
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("test1234");
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const {
    mutate: login, // 'mutate' is the function you call to trigger the mutation
    isPending, // This is true while the API call is in progress
    error, // This will contain the error object if the mutation fails
  } = useMutation({
    mutationFn: loginApi, // The API function to call
    onSuccess: (data) => {
      // This function runs on a successful API call
      authLogin({ user: data.data.user, token: data.token }); // Update AuthContext
      navigate("/app", { replace: true }); // Redirect to the main app
    },
    onError: (err) => {
      // Optional: you can also handle errors here if needed
      console.error("Login failed:", err.message);
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login({ email, password }); // Call the 'login' (mutate) function
  }

  return (
    <main className="h-[93vh] m-6 font-semibold text-alice-blue bg-gradient-to-r from-bright-gray to-dark-gray">
      <PageNav />
      <form
        onSubmit={handleSubmit}
        className="@container mx-auto my-16 py-16 rounded-lg max-w-lg flex flex-col gap-8 bg-dark-2"
      >
        <div className="flex flex-col gap-2 px-4">
          <label htmlFor="email" className="text-xl">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            disabled={isPending} // Disable input while logging in
            className="p-2 text-dark-2 bg-alice-blue hover:bg-pearl disabled:bg-gray-400"
          />
        </div>
        <div className="flex flex-col gap-2 px-4">
          <label htmlFor="password-input" className="text-xl">
            Password
          </label>
          <input
            type="password"
            id="password-input"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            disabled={isPending} // Disable input while logging in
            className="p-2  text-dark-2 bg-alice-blue hover:bg-pearl disabled:bg-gray-400"
          />
        </div>
        {error && <p className="text-red-500 text-center">{error.message}</p>}
        <div className="flex items-center justify-center">
          <button
            disabled={isPending}
            className="px-4 py-2 shadow-lg text-dark-gray bg-alice-blue hover:bg-pearl hover:shadow-inner"
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </main>
  );
}

export default Login;
