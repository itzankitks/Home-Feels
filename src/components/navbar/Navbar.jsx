import { useContext } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" className="logoLink">
          <span className="logo">
            {/* <Home className="logoIcon" /> */}
            <img src="/logo.svg" alt="HomeFeels Logo" className="logoIcon" />
            HomeFeels
          </span>
        </Link>
        {user ? (
          <div className="userInfo">
            <span className="username">{user.username}</span>
            <div className="userAvatar">{user.username[0].toUpperCase()}</div>
          </div>
        ) : (
          <div className="navItems">
            {/* <Link to="/register">
              <button className="navButton register">Register</button>
            </Link> */}
            <Link to="/login">
              <button className="navButton login">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
