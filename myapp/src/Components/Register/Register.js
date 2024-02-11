import React, { useState } from "react";
import "./Register.css";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { signUp } from "../../redux/action/loginaction";

export const Register = () => {
  //   const dispatch = useDispatch();
  //   const selector = useSelector((state) => state.loginreducer);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  //   const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("email:", email);
    console.log("Password:", password);
    console.log("cPassword:", confirmPassword);
    console.log("register clicked");

    const formData = { username, email, password };
    console.log(formData);

    // dispatch(signUp(formData));
    // navigate("/");
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register</h2>

        <input
          className="inp-group"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="inp-group"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="inp-group"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          className="inp-group"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setconfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className="reg-button">
          Register
        </button>
      </form>
    </div>
  );
};
