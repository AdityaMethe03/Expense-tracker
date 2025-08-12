import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className=" flex items-center justify-between p-8">
      <Link to="/"></Link>
      <ul className="flex flex-row items-center justify-center gap-10 text-xl">
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      </ul>
    </nav>
  );
}
