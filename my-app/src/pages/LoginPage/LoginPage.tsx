import React from "react";
import LoginPage from "../../components/LoginForm";
import "./LoginPage.css";

const Login: React.FC = () => {
  return (
    <div className="loginpage">
      <h1>Log-In</h1>
      <LoginPage />
    </div>
  );
};

export default Login;
