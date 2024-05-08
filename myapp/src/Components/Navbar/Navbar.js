import "../Navbar/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/blacklogofinal.png";
import { Sidebar } from "../Sidebar/Sidebar";
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../../redux/action/loginaction";
import { useContext, useState } from "react";
import {
  faThumbsUp,
  faThumbsDown,
  faComment,
  faHeart,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const handleOpenClick = () => {
    if (isOpen == false) {
      document.getElementById("menu-sidebar").style.width = "300px";
      setIsOpen(true);
    } else {
      document.getElementById("menu-sidebar").style.width = "0px";
      setIsOpen(false);
    }
  };

  return (
    <>
      <div id="menu-sidebar" className="sidebared">
        <div className="menu-expand-sidebar">
          <div className="menu-sidebar-content">
            <Link
              to="/createpost"
              style={{ textDecoration: "none" }}
              onClick={handleOpenClick}
            >
              <div className="menu-button"> Create Post</div>
            </Link>
            <Link
              to="/communities"
              style={{ textDecoration: "none" }}
              onClick={handleOpenClick}
            >
              <div className="menu-button"> Communities </div>
            </Link>
            {token !== null ? (
              <Link
                to="/"
                style={{ textDecoration: "none" }}
                onClick={handleLogoutClick}
              >
                <div className="menu-button"> Logout </div>
              </Link>
            ) : (
              <Link
                to="/login"
                style={{ textDecoration: "none" }}
                onClick={handleOpenClick}
              >
                <div className="menu-button"> Login </div>
              </Link>
            )}
          </div>
          <div className="app-info">
            Made with
            <span style={{ marginLeft: "7px", marginRight: "7px" }}>
              <FontAwesomeIcon
                icon={faHeart}
                style={{ color: "#dba570", fontSize: "20px" }}
              />
            </span>
            in India
          </div>
        </div>
      </div>
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" className="logo-icon">
            <img src={logo} className="navbar-logo-img"></img>
            <span>Animespectra</span>
          </Link>
        </div>
        <div className="navbar-mail">
          <Link to="/createpost" className="fav-icon">
            Create Post
          </Link>
          <Link to="/communities" className="fav-icon">
            Communities
          </Link>
          {token !== null ? (
            <Link to="/" className="fav-icon" onClick={handleLogoutClick}>
              Logout
            </Link>
          ) : (
            <Link to="/login" className="fav-icon">
              Login
            </Link>
          )}
          <div className="menu-icon" onClick={handleOpenClick}>
            <i class="ri-menu-line"></i>
          </div>
        </div>
      </div>
    </>
  );
};
