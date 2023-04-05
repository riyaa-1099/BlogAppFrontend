import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { back_url } from "./url";

interface LoginProps {}

const LoginPage: React.FC<LoginProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post(`${back_url}/user/signin`, { email, password })
      .then((response) => {
        console.log("loginform", response.data);
        console.log(response.data.token);
        document.cookie = `token=${response.data.token}; path=/`;
        localStorage.setItem("loggedIn", "true");
        navigate("/");
        window.location.reload()
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleLoginSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <br />
        <button className="button" type="submit">
          Login
        </button>
      </form>
      <Link to="/createaccount">Create New Account</Link>
    </div>
  );
};

export default LoginPage;
