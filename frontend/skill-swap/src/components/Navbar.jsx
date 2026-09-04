import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

import { FaSearch } from "react-icons/fa";
import { FiSun, FiMoon } from "react-icons/fi";
import Avatar from "./Avatar";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll for backdrop elevation effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/browse?search=${encodeURIComponent(query.trim())}`);
    setQuery("");
    setOpen(false);
  };

  return (
    <header className="navbar-wrapper">
      <nav className={`navbar-pill ${scrolled ? "scrolled" : ""}`}>
        {/* BRAND LOGO */}
        <div className="logo">
          <Link to="/" onClick={() => setOpen(false)}>
            SkillSwap
            <span className="logo-dot" />
          </Link>
        </div>

        {/* SEARCH BAR (DESKTOP) */}
        <form className="nav-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search skills..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="search-btn" aria-label="Search">
            <FaSearch size={12} />
          </button>
        </form>

        {/* DESKTOP NAV LINKS */}
        <div className="nav-links-center">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `pk-nav-link ${isActive ? "active" : ""}`}
            onClick={() => setOpen(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/browse"
            className={({ isActive }) => `pk-nav-link ${isActive ? "active" : ""}`}
            onClick={() => setOpen(false)}
          >
            Discover
          </NavLink>

          {user && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) => `pk-nav-link ${isActive ? "active" : ""}`}
              onClick={() => setOpen(false)}
            >
              Dashboard
            </NavLink>
          )}
        </div>

        {/* RIGHT ACTION CONTROLS */}
        <div className="nav-actions">
          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className="pk-theme-btn"
            title="Toggle theme"
            type="button"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <FiSun size={15} /> : <FiMoon size={15} />}
          </button>

          {user ? (
            <div className="nav-user-cluster">
              <NavLink
                to="/post"
                className="pk-btn-primary nav-post-btn"
                onClick={() => setOpen(false)}
              >
                + Post Skill
              </NavLink>

              <Link
                to={`/profile/${user._id || user.id}`}
                onClick={() => setOpen(false)}
                title={user.name || "Profile"}
                className="user-avatar-link"
              >
                <Avatar name={user.name} size={32} />
              </Link>

              <button
                onClick={handleLogout}
                className="pk-btn-secondary logout-btn"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="nav-auth-cluster">
              <Link
                to="/login"
                className="pk-btn-secondary"
                onClick={() => setOpen(false)}
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="pk-btn-primary"
                onClick={() => setOpen(false)}
              >
                Get Started
              </Link>
            </div>
          )}

          {/* MOBILE MENU TOGGLE BUTTON */}
          <button
            type="button"
            className={`pk-menu-toggle ${open ? "open" : ""}`}
            onClick={() => setOpen(!open)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>
        </div>

        {/* MOBILE DROPDOWN PANEL */}
        <div className={`pk-mobile-dropdown ${open ? "open" : ""}`}>
          <form className="mobile-search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search skills..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="search-btn" aria-label="Search">
              <FaSearch size={12} />
            </button>
          </form>

          <NavLink
            to="/"
            end
            className={({ isActive }) => `mobile-link ${isActive ? "active" : ""}`}
            onClick={() => setOpen(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/browse"
            className={({ isActive }) => `mobile-link ${isActive ? "active" : ""}`}
            onClick={() => setOpen(false)}
          >
            Discover
          </NavLink>

          {user && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) => `mobile-link ${isActive ? "active" : ""}`}
              onClick={() => setOpen(false)}
            >
              Dashboard
            </NavLink>
          )}

          {user && (
            <NavLink
              to="/post"
              className="mobile-link post-highlight"
              onClick={() => setOpen(false)}
            >
              + Post Skill
            </NavLink>
          )}

          {user ? (
            <div className="mobile-user-section">
              <Link
                to={`/profile/${user._id || user.id}`}
                className="mobile-profile-row"
                onClick={() => setOpen(false)}
              >
                <Avatar name={user.name} size={30} />
                <span>{user.name || "My Profile"}</span>
              </Link>
              <button onClick={handleLogout} className="mobile-link signout-link">
                Sign out
              </button>
            </div>
          ) : (
            <div className="mobile-auth-section">
              <Link
                to="/login"
                className="mobile-link"
                onClick={() => setOpen(false)}
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="pk-btn-primary w-full text-center"
                onClick={() => setOpen(false)}
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

