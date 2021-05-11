import React, { useState } from "react";
import { CustomLink as Link } from "../../util/customLinks";
import { useHistory } from "react-router-dom";
import { login } from "../../util/firebaseFunctions";
import "./Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      history.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="authContainer">
      <h1>Login Page</h1>
      {error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="error"></div>
      )}
      <form onSubmit={handleSubmit} className="authForm">
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          value={email}
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          value={password}
          autoComplete="on"
        />
        <button type="submit">Login</button>
      </form>
      <div className="formLinks">

        <Link to="/forgotpassword" className="switchAuth">
          Reset Password / Forgot Password?
        </Link>
      </div>
    </div>
  );
}
