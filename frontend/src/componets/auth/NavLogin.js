import React, { useState } from "react";
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import {login} from '../../util/firebaseFunctions';
import "../../css/NavLogin.css";

export default function NavLogin() {
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
      setError(err.message)
    }
  };

  return (
    <div className="navLoginContainer">
      {error ? <div className="navError">{error}</div> : <div className="navError"></div>}
      <form onSubmit={handleSubmit} className="navAuthForm">
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
      <Link to="/signup" className="navSwitchAuth">Need to sign up?</Link>
    </div>
  );
}