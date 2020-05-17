import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { apiURL } from '../util/apiURL';
import { signUp } from '../util/firebaseFunctions';

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const API = apiURL();
    
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            let res = await signUp(email, password);
            await axios.post(`${API}/api/users`, { id: res.user.uid, email });      
            history.push("/")
        } catch (err) {
            console.log("ERROR ", err);
        }

    }
    
    return (
      <div>
        <h1>Sign Up Page</h1>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
};