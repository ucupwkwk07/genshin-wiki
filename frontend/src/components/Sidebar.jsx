import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUserAlt, FaShieldAlt, FaGem } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar-container">
      <nav>
        <ul className="sidebar-menu">
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
              <FaHome className="sidebar-icon" /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/characters" className={({ isActive }) => (isActive ? "active" : "")}>
              <FaUserAlt className="sidebar-icon" /> Characters
            </NavLink>
          </li>
          <li>
            <NavLink to="/weapons" className={({ isActive }) => (isActive ? "active" : "")}>
              <FaShieldAlt className="sidebar-icon" /> Weapons
            </NavLink>
          </li>
          <li>
            <NavLink to="/artifacts" className={({ isActive }) => (isActive ? "active" : "")}>
              <FaGem className="sidebar-icon" /> Artifacts
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;