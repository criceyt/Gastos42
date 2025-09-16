import InputField from "../components/InputField";
import SocialLogin from "../components/SocialLogin";
import { Link } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8081/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Error en el registro");
      }

      const data = await response.json();
      console.log("Usuario registrado:", data);
      alert("Registro exitoso");
    } catch (error) {
      console.error(error);
      alert("Hubo un error en el registro");
    }
  };

  return (
    <div className="login-container">
      <h2 className="form-title">Create your account</h2>
      <SocialLogin />
      <p className="separator"><span>or</span></p>

      <form onSubmit={handleSubmit} className="login-form">
        <InputField
          type="text"
          placeholder="First name"
          icon="account_circle"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
        />
        <InputField
          type="text"
          placeholder="Last name"
          icon="account_circle"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
        />
        <InputField
          type="email"
          placeholder="Email address"
          icon="mail"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <InputField
          type="password"
          placeholder="Password"
          icon="lock"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <button className="login-button">Sign Up</button>
      </form>

      <p className="signup-text">
        Already have an account? <Link to="/" className="signup-link">Log in</Link>
      </p>
    </div>
  );
};

export default Register;
