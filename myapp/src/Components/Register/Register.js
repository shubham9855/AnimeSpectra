import React, { useState } from "react";
import "./Register.css";
import { RegisterSchema } from "../Registerschema";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { signUp } from "../../redux/action/loginaction";

const initialValues = {
  name: "",
  email: "",
  password: "",
  role: "BASIC",
  interests: [],
  confirm_password: "",
};
export const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { errors, values, touched, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/auth/signup`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userName: values.name,
              email: values.email,
              password: values.password,
              role: "BASIC",
              interests: [],
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Login failed");
        }
        navigate("/login");
        // Handle successful login

        // You might want to redirect the user or update the UI accordingly
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register</h2>

        <input
          className="inp-group"
          type="text"
          placeholder="Username"
          name="name"
          value={values.name}
          onChange={handleChange}
          required
        />
        {errors.name && touched ? <p>{errors.name}</p> : null}
        <input
          className="inp-group"
          type="text"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
        {errors.email && touched ? <p>{errors.email}</p> : null}
        <input
          className="inp-group"
          type="password"
          placeholder="Password"
          name="password"
          value={values.password}
          onChange={handleChange}
          required
        />
        {errors.password && touched ? <p>{errors.password}</p> : null}
        <input
          className="inp-group"
          type="password"
          name="confirm_password"
          placeholder="Confirm Password"
          value={values.confirm_password}
          onChange={handleChange}
          required
        />
        {errors.confirm_password && touched ? (
          <p>{errors.confirm_password}</p>
        ) : null}
        <button type="submit" className="reg-button">
          Register
        </button>
      </form>
    </div>
  );
};
