import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { signIn } from "../../redux/action/loginaction";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const navigate = useNavigate();
  //   const selector = useSelector((state) => state.loginreducer);
  //   const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    //     console.log("selector", selector);

    //     selector?.user.map((obj) => {
    //       if (email === obj.email && password === obj.password) {
    //         console.log("login done");
    //         dispatch(signIn());
    //         navigate("/");
    //       } else {
    //         alert("you must sign-up");
    //       }
    //     });
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-heading">Login</h2>
        {/* <div className="input-group"> */}
        <input
          className="input-group"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {/* </div> */}
        {/* <div className="input-group"> */}
        <input
          className="input-group"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* </div> */}
        <button type="submit" className="login-button">
          Login
        </button>
        <Link className="toregister" to="/register">
          Don't have an account?
        </Link>
      </form>
    </div>
  );
};
