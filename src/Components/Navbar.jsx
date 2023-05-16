import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaBars } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";

import { logout } from "../Redux/Actions/login";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [showUserMenu, setShowUserMenu] = React.useState(false);

  // to implement click outside function
  const userMenu = React.useRef();

  const smallDevicesView = useMediaQuery({
    query: "(max-width:500px)",
  });
  function toggleUserMenu() {
    setShowUserMenu(!showUserMenu);
  }
  function logoutUser() {
    dispatch(logout());
    navigate("/login", { replace: true });
  }
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <React.Fragment>
      <div className="nav_container_light">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <h1 style={{ color: "deeppink" }}>Calculator</h1>
        </Link>
        {smallDevicesView && (
          <FaBars
            onClick={toggleUserMenu}
            style={{
              position: "absolute",
              right: "10px",
            }}
          />
        )}
        <div
          onClick={toggleUserMenu}
          className={
            location.pathname === "/profile"
              ? "active avatar_container"
              : "avatar_container"
          }
        >
          <img
            src={
              user
                ? user.photo
                : "https://www.w3schools.com/w3images/avatar6.png"
            }
            alt=""
            className="avatar"
          />
        </div>
        {showUserMenu && (
          <>
            <div
              ref={userMenu}
              style={{ backgroundColor: "black" }}
              className="user_menu_container"
            >
              <h3 onClick={logoutUser} className="user_menu_item">
                Logout
              </h3>
            </div>
          </>
        )}
      </div>
    </React.Fragment>
  );
}
