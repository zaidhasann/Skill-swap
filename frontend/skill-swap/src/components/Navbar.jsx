import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

import { FaSearch } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { BsBrowserSafari } from "react-icons/bs";
import { FcBusinessman } from "react-icons/fc";
import { LuLayoutDashboard } from "react-icons/lu";
import { FiSun, FiMoon } from "react-icons/fi";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/login");
    setOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/browse?search=${query}`);
    setQuery("");
    setOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-content">
        {/* LOGO */}
        <h1 className="logo">
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            SkillSwap
          </Link>
        </h1>

        {/* SEARCH BAR */}
        <form className="nav-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search skills..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="search-btn">
            <FaSearch size={16} />
          </button>
        </form>

        {/* THEME TOGGLE */}
        <button
          onClick={toggleTheme}
          className="theme-btn"
          title="Toggle theme"
        >
          {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20}/>}
        </button>

        {/* MOBILE MENU ICON */}
        <div className="menu-icon" onClick={() => setOpen(!open)}>
          {open ? "✕" : "☰"}
        </div>

        {/* NAV LINKS */}
        <div className={`links ${open ? "open" : ""}`}>
          <Link to="/" onClick={() => setOpen(false)} title="Home">
            <IoHome size={20} />
          </Link>

          <Link to="/browse" onClick={() => setOpen(false)} title="Browse">
            <BsBrowserSafari size={20} />
          </Link>

          {user && (
            <Link to="/post" onClick={() => setOpen(false)}>
              Post Skill
            </Link>
          )}

          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setOpen(false)} title="Dashboard">
                <LuLayoutDashboard size={20} />
              </Link>

              <Link
                to={`/profile/${user._id || user.id}`}
                onClick={() => setOpen(false)}
                title="Profile"
              >
                <FcBusinessman size={20} />
              </Link>

              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)}>
                Login
              </Link>
              <Link to="/signup" onClick={() => setOpen(false)}>
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
