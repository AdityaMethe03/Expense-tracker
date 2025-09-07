import { NavLink } from "react-router-dom";
import Logo from "./Logo";

export default function PageNav() {
  return (
    <nav className=" flex items-center justify-between p-8 font-semibold">
      <Logo />
      <ul className="flex flex-row items-center justify-center gap-10 text-xl">
        <li className="hover:text-text-header">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="hover:text-text-header">
          <NavLink to="/features">Features</NavLink>
        </li>
        <li className="hover:text-text-header">
          <NavLink to="/login">Login</NavLink>
        </li>
        <li className="hover:text-text-header">
          <NavLink to="/register">Register</NavLink>
        </li>
      </ul>
    </nav>
  );
}
