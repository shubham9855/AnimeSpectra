import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { LoginSchema } from "../Loginschema";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { signIn } from "../../redux/action/loginaction";

const initialValues = {
  email: "",
  password: "",
};

export const Login = () => {
  const { errors, values, touched, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  console.log("errors ", errors);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  //   const navigate = useNavigate();
  //   const selector = useSelector((state) => state.loginreducer);
  //   const dispatch = useDispatch();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
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
  // };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-heading">Login</h2>
        {/* <div className="input-group"> */}
        <input
          className="input-group"
          type="text"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
        {errors.email && touched ? <p>{errors.email}</p> : null}
        {/* </div> */}
        {/* <div className="input-group"> */}
        <input
          className="input-group"
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
        {errors.password && touched ? <p>{errors.password}</p> : null}
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
