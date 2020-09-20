import React, { useState } from "react";
import { forgotPassword } from "../../util/firebaseFunctions";
import { CustomLink as Link } from "../../util/customLinks";


export default () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      alert("Please check you email to reset your password");
      
    } catch (error) {
      setError(error.message)
    }
  };

  return (
    <div className="authContainer">
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit} className="authForm">
        {error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="error"></div>
        )}
        <p>Please enter your email to reset your password</p>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Reset</button>

      </form>
        <Link to="/login" className="switchAuth">
          Go to Login page!
        </Link>
    </div>
  );
};
