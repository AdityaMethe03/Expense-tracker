import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className=" flex items-center justify-between p-8">
      <Link to="/"></Link>
      <ul className="flex flex-row items-center justify-center gap-10 text-xl">
        <li className="hover:text-parachment">
          <NavLink to="/product">Home</NavLink>
        </li>
        <li className="hover:text-parachment">
          <NavLink to="/pricing">About</NavLink>
        </li>
        <li className="hover:text-parachment">
          <NavLink to="/login">Login</NavLink>
        </li>
        <li className="hover:text-parachment">
          <NavLink to="/register">Register</NavLink>
        </li>
      </ul>
    </nav>
  );
}
