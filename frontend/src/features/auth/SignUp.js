import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { CustomLink as Link } from "../../util/customLinks";
import { apiURL } from "../../util/apiURL";
import { signUp } from "../../util/firebaseFunctions";
import "./Auth.css";

const VALID_CLASSES = [
  "staff",
  "4.1",
  "4.2",
  "4.3",
  "4.4",
  "5.1",
  "5.2",
  "5.3",
  "5.4",
  "6.1",
  "6.2",
  "6.3",
  "6.4",
  "7.1",
  "7.2",
  "8.1",
  "8.2",
].reverse();

export default function SignUp() {
  const [email, setEmail] = useState("admin@admin.com");
  const [password, setPassword] = useState("");
  const [classTitle, setClassTitle] = useState("staff");
  const [error, setError] = useState("");
  const history = useHistory();
  const API = apiURL();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await signUp(email.toLowerCase(), password);
      await axios.post(`${API}/api/users`, {
        id: res.user.uid,
        email: email.toLowerCase(),
        class: classTitle.trim(),
      });
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
          <input readOnly placeholder="Email" value={email} required />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            value={password}
            autoComplete="on"
            required
          />
          <select
            readOnly
            value={classTitle}
            placeholder="Class Num Exp: 6.4"
            required
          >
            <option key={"choose"} value={""} selected disabled>
              Class Number
            </option>
            ;
            {VALID_CLASSES.map((classNum) => {
              return (
                <option key={classNum} value={classNum}>
                  {classNum}
                </option>
              );
            })}
          </select>
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
