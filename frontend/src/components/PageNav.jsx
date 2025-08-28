import { NavLink, Link } from "react-router-dom";
import Logo from "./Logo";

export default function PageNav() {
  return (
    <nav className=" flex items-center justify-between p-8">
      <Link to="/">
        <Logo />
      </Link>
      <ul className="flex flex-row items-center justify-center gap-10 text-xl">
        <li className="hover:text-parachment">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="hover:text-parachment">
          <NavLink to="/features">Features</NavLink>
        </li>
        <li className="hover:text-parachment">
          <NavLink to="/login">Login</NavLink>
        </li>
      </ul>
    </nav>
  );
}
