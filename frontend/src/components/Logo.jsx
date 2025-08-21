import { NavLink } from "react-router-dom";

function Logo() {
  return (
    <NavLink to="/">
      <img src="/logo.png" alt="expense-tracker-logo" className="h-10 w-fit" />
    </NavLink>
  );
}

export default Logo;
