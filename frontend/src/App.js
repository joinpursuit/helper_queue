import React, { useEffect } from "react";
import "./App.css";
import Home from "./componets/Home";
import NavBar from "./componets/NavBar";
import AuthProvider from "./providers/AuthProvider";
import { AuthRoute, ProtectedRoute, AdminRoute } from "./util/auth_routes";
import SignUp from "./componets/auth/SignUp";
import Login from "./componets/auth/Login";
import { Route } from "react-router-dom";
import Student from "./componets/views/Student";
import Admin from "./componets/views/Admin";
import Gong from "./componets/Gong";
import socketIOClient from "socket.io-client";
import gongSound from "./assets/gongSound.wav";
import { apiURL } from "./util/apiURL";

function App() {
  // const API = apiURL();
  // const socket = socketIOClient(API);
  // all users to hear gong
  // useEffect(() => {
  //   const ringGong = () => {
  //     let src = gongSound;
  //     let audio = new Audio(src);
  //     audio.play();
  //     console.log("ring gong")
  //   };
  //   socket.on("gong ring", ringGong);
  //   return () => socket.off("gong ring", ringGong);
  // }, []);

  return (
    <div className="App">
      <AuthProvider>
        <NavBar />
        <Route exact path="/">
          <Student />
        </Route>
        <AuthRoute path="/signup">
          <SignUp />
        </AuthRoute>
        <AuthRoute path="/login">
          <Login />
        </AuthRoute>
        <AdminRoute path="/admin">
          <Admin />
        </AdminRoute>
        <Route path="/gong">
          <Gong />
        </Route>
      </AuthProvider>
    </div>
  );
}

export default App;
