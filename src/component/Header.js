import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Header() {
  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/"; // redirect to login
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <a className="navbar-brand" href="#">
        Project <span>Defector</span> | Admin Dashboard
      </a>
      <ul className="navbar-nav ms-auto">
        <li className="nav-item dropdown">
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="accountDropdown">
            <li>
              <button className="dropdown-item" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}
