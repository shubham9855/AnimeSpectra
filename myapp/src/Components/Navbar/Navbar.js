import "../Navbar/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
// import cart from "../../images/cart_image.png";
// import search from "../../images/search_image.png";
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../../redux/action/loginaction";
// import { useState } from "react";

export const Navbar = () => {
  //   const navigate = useNavigate();
  //   const [find, setFind] = useState("");
  //   const dispatch = useDispatch();
  //   const islogin = useSelector((state) => state.loginreducer.islogin);

  //   if (islogin) {
  return (
    <>
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" className="logo-icon">
            Animespectra
          </Link>
        </div>

        <div className="navbar-middle">
          {/* HELLO */}
          {/* <Link
            to="/sneaker"
            className="sneaker-icon"
            // onClick={() => dispatch(clearSneakers())}
          >
            Sneakers
          </Link> */}
          {/* <Link to="/communities" className="fav-icon">
            Communities
          </Link>
          <Link to="/about" className="fav-icon">
            Create Post
          </Link> */}
          <div className="search-icon">
            <input
              type="text"
              placeholder="Search"
              className="search-input"
              //   onChange={(e) => {
              //     console.log("search val", e.target.value);
              //     setFind(e.target.value);
              //   }}
            />
            {/* <img
              src={search}
              className="search-img"
              onClick={() => {
                dispatch(searchSneakers(find));
                navigate("/sneaker");
              }} */}
            {/* ></img> */}
          </div>
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
