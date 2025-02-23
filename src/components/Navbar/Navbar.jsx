import React from "react";
import LogoutButton from "../LogoutButton/LogoutButton";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>CodeEditor</h1>
      <LogoutButton />
    </nav>
  );
};

export default Navbar;
