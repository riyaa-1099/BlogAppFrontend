import React from "react";
import RegisterForm from "../../components/RegisterForm";
import "./RegisterPage.css";

interface RegisterPageProps {}

const RegisterPage: React.FC<RegisterPageProps> = () => {
  return (
    <div className="registerpage">
      <h1>Register</h1>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
