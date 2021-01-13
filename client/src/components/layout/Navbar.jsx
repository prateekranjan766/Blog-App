import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import AuthContext from "./../../context/auth/authContext";
import BlogContext from "./../../context/blog/blogContext";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const blogContext = useContext(BlogContext);

  const { logout, user, isAuthenticated } = authContext;
  const { clearBlogs, clearFilter } = blogContext;

  const onLogout = () => {
    clearBlogs();
    clearFilter();
    logout();
  };

  return (
    <div className="navbar">
      <h1>
        <i className="fab fa-blogger-b" />
        Blog App
      </h1>
      <ul>
        <li>
          <Link className="navbar__link" to="all-posts">
            All Posts
          </Link>
        </li>
        <li>
          <Link className="navbar__link" to="my-posts">
            My Posts
          </Link>
        </li>

        {isAuthenticated === true && (
          <li
            style={{
              color: "#16c79a",
              fontFamily: "inherit",
              fontSize: "2rem",
            }}
          >
            Hello! {user && user.name}
          </li>
        )}

        <li>
          <Link className="navbar__link" to="/login" onClick={onLogout}>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
