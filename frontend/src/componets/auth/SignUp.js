import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { CustomLink as Link } from '../../util/customLinks'
import { apiURL } from "../../util/apiURL";
import { signUp } from "../../util/firebaseFunctions";
import "../../css/Auth.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [classTitle, setClassTitle] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  const API = apiURL();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await signUp(email, password);
      await axios.post(`${API}/api/users`, { id: res.user.uid, email, class: classTitle.trim() });
      history.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="authContainer">
      <h1>Sign Up Page</h1>
      {error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="error"></div>
      )}
      <form onSubmit={handleSubmit} className="authForm">
        <div className="inputContainer">
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            value={email}
            required
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            value={password}
            autoComplete="on"
            required
          />

          <input
            onChange={(e) => setClassTitle(e.target.value)}
            value={classTitle}
            placeholder="Class Name Exp: 6.4"
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <Link to="/login" className="switchAuth">
        {" "}
        Already have an account? Login
      </Link>
    </div>
  );
}
