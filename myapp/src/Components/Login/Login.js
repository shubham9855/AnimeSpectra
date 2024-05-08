import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { LoginSchema } from "../Loginschema";
import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { signIn } from "../../redux/action/loginaction";

const initialValues = {
  email: "",
  password: "",
};

export const Login = () => {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { errors, values, touched, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/auth/signin`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: values.email,
              password: values.password,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();

          const token = data.jwtToken;

          // Store the token in localStorage
          localStorage.setItem("token", token);
          navigate("/");
          // Handle successful login
        } else {
          throw new Error("Login failed");
        }

        // You might want to redirect the user or update the UI accordingly.
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
  });
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
