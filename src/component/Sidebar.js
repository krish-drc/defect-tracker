import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState("");

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? "" : menu);
  };

  return (
    <div className="bg-primary text-white vh-100 p-3" style={{ width: "250px" }}>
      <h3 className="mb-4">Admin Panel</h3>
      <ul className="list-unstyled">
        <li>
          <Link to="/admin/dashboard">
            <button className="btn btn-primary w-100 text-start mb-2">
              Dashboard
            </button>
          </Link>
        </li>

        <li>
          <button
            className="btn btn-primary w-100 text-start mb-1"
            onClick={() => toggleMenu("projects")}
          >
            Projects
          </button>
          {openMenu === "projects" && (
            <ul className="list-unstyled ms-3">
              <div className="sidebar p-3 bg-dark text-white">
      <Link to="/post-project">
        <button className="btn btn-outline-light w-100 text-start mb-1">
          Add Projects
        </button>
      </Link>

    </div>
              <div className="sidebar p-3 bg-dark text-white">
      <Link to="/manage-project">
        <button className="btn btn-outline-light w-100 text-start mb-1">
          Manage Projects
        </button>
      </Link>

    </div>
            </ul>
          )}
        </li>

        <li>
          <button
            className="btn btn-primary w-100 text-start mb-1"
            onClick={() => toggleMenu("employees")}
          >
            Employees
          </button>
          {openMenu === "employees" && (
            <ul className="list-unstyled ms-3">
              <div className="sidebar p-3 bg-dark text-white">
      <Link to="/add-employee">
        <button className="btn btn-outline-light w-100 text-start mb-1">
          Add Employees
        </button>
      </Link>

    </div>
                <div className="sidebar p-3 bg-dark text-white">
      <Link to="/manage-employee">
        <button className="btn btn-outline-light w-100 text-start mb-1">
          Manage Employees
        </button>
      </Link>

    </div>
            </ul>
          )}
        </li>

        <li>
          <button
            className="btn btn-primary w-100 text-start mb-1"
            onClick={() => toggleMenu("roles")}
          >
            Roles
          </button>
          {openMenu === "roles" && (
            <ul className="list-unstyled ms-3">
               <div className="sidebar p-3 bg-dark text-white">
      <Link to="/add-role">
        <button className="btn btn-outline-light w-100 text-start mb-1">
          Add Role
        </button>
      </Link>

    </div>
             <div className="sidebar p-3 bg-dark text-white">
      <Link to="/manage-role">
        <button className="btn btn-outline-light w-100 text-start mb-1">
          Manage Role
        </button>
      </Link>

    </div>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
}
