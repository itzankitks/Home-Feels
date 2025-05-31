import { useContext } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Home } from "lucide-react";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" className="logoLink">
          <span className="logo">
            <Home className="logoIcon" />
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
            <button className="navButton register">Register</button>
            <button className="navButton login">Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
