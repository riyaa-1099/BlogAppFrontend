import React, { useState } from "react";
import { back_url } from "./url";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface RegisterFormProps {}

const RegisterForm: React.FC<RegisterFormProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post(`${back_url}/user/signup`, { email, password, name })
      .then((response) => {
        console.log(response);
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="name"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
          />
        </label>
        <br />
        <label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
        </label>
        <br />
        <label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <br />

        <button className="button" type="submit">
          Register
        </button>
      </form>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default RegisterForm;
