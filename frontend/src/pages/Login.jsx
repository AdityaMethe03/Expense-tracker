import { useState } from "react";
import PageNav from "../components/PageNav";
import { Link } from "react-router-dom";
import Button from "../components/Button";

function Login() {
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwertyui");

  return (
    <main className="h-[93vh] m-6 font-semibold text-alice-blue bg-gradient-to-r from-bright-gray to-dark-gray">
      <PageNav />
      <form className="@container mx-auto my-16 py-16 rounded-lg max-w-lg flex flex-col gap-8 bg-dark-2">
        <div className="flex flex-col gap-2 px-4">
          <label htmlFor="email" className="text-xl">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="p-2 text-dark-2 bg-alice-blue hover:bg-pearl"
          />
        </div>
        <div className="flex flex-col gap-2 px-4">
          <label htmlFor="email" className="text-xl">
            Password
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="p-2 text-dark-2 bg-alice-blue hover:bg-pearl"
          />
        </div>
        <div className="flex items-center">
          <Button text="Get started for free..." />
        </div>
      </form>
    </main>
  );
}

export default Login;
