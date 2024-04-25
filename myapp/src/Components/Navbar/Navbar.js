import "../Navbar/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/blacklogofinal.png";
import { Sidebar } from "../Sidebar/Sidebar";
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../../redux/action/loginaction";
import { useState } from "react";
import {
  faThumbsUp,
  faThumbsDown,
  faComment,
  faHeart,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Navbar = () => {
  //   const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenClick = () => {
    if (isOpen == false) {
      document.getElementById("menu-sidebar").style.width = "300px";
      // document.getElementById("sidebar-main-id").style.display = "block";
      // document.getElementById("sidebar-main-id").style.width = "73%";
      setIsOpen(true);
    } else {
      document.getElementById("menu-sidebar").style.width = "0px";
      // document.getElementById("sidebar-main-id").style.display = "none";
      setIsOpen(false);
    }
  };
  //   const dispatch = useDispatch();
  //   const islogin = useSelector((state) => state.loginreducer.islogin);

  //   if (islogin) {
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
            <Link
              to="/login"
              style={{ textDecoration: "none" }}
              onClick={handleOpenClick}
            >
              <div className="menu-button"> Login </div>
            </Link>
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
          <Link to="/" className="logo-icon" onClick={handleOpenClick}>
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
          <Link to="/login" className="fav-icon">
            Login
          </Link>
          <div className="menu-icon" onClick={handleOpenClick}>
            <i class="ri-menu-line"></i>
          </div>
        </div>
      </div>
    </>
  );
  //   } else {
  //     return (
  //       <>
  //         <div className="navbar-container">
  //           <div className="navbar-logo">
  //             <Link to="/" className="logo-icon">
  //               kicks_rush
  //             </Link>
  //           </div>

  //           <div className="navbar-middle">
  //             <Link
  //               to="/sneaker"
  //               className="sneaker-icon"
  //               onClick={() => dispatch(clearSneakers())}
  //             >
  //               Sneakers
  //             </Link>
  //             <Link to="/favorite" className="fav-icon">
  //               Favorites
  //             </Link>
  //             <Link to="/about" className="fav-icon">
  //               About us
  //             </Link>
  //             <div className="search-icon">
  //               <input
  //                 type="text"
  //                 placeholder="Search"
  //                 className="search-input"
  //                 onChange={(e) => {
  //                   console.log("search val", e.target.value);
  //                   setFind(e.target.value);
  //                 }}
  //               ></input>
  //               <img
  //                 src={search}
  //                 className="search-img"
  //                 onClick={() => {
  //                   console.log("seach action dispatched", find);
  //                   dispatch(searchSneakers(find));
  //                   navigate("/sneaker");
  //                 }}
  //               ></img>
  //             </div>
  //           </div>
  //           <div className="navbar-mail">
  //             <Link to="/login" className="login-icon">
  //               login
  //             </Link>
  //             <Link to="/cart" className="image-icon">
  //               <img src={cart} className="cart-image"></img>
  //             </Link>
  //           </div>
  //         </div>
  //       </>
  //     );
  //   }
  // };
};
