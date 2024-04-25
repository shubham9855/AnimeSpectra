import React, { useState } from "react";
import "./Register.css";
import { RegisterSchema } from "../Registerschema";
import { useFormik } from "formik";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { signUp } from "../../redux/action/loginaction";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
};
export const Register = () => {
  const { errors, values, touched, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  //   const dispatch = useDispatch();
  //   const selector = useSelector((state) => state.loginreducer);
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setconfirmPassword] = useState("");
  //   const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Username:", username);
  //   console.log("email:", email);
  //   console.log("Password:", password);
  //   console.log("cPassword:", confirmPassword);
  //   console.log("register clicked");

  //   const formData = { username, email, password };
  //   console.log(formData);

  // dispatch(signUp(formData));
  // navigate("/");
  // };

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
