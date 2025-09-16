import InputField from "../components/InputField";
import SocialLogin from "../components/SocialLogin";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8081/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Credenciales incorrectas");
      }

      const data = await response.json();
      // Guardamos el token en localStorage
      localStorage.setItem("token", data.token);
      // Redirigimos al dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Error en login: " + error.message);
    }
  };

  return (
    <div className="login-container">
      <h2 className="form-title">Log in with</h2>
      <SocialLogin />
      <p className="separator"><span>or</span></p>

      <form onSubmit={handleSubmit} className="login-form">
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
        <a href="#" className="forgot-pass-link">Forgot password?</a>
        <button className="login-button">Log In</button>
      </form>

      <p className="signup-text">
        Don't have an account? <Link to="/Register" className="signup-link">Signup now</Link>
      </p>
    </div>
  );
};

export default Login;
