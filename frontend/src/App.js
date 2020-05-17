import React from 'react';
import './App.css';
import Home from './componets/Home';
import NavBar from './componets/NavBar';
import AuthProvider from './providers/AuthProvider';
import { AuthRoute } from './util/auth_routes';
import SignUp from './componets/SignUp';
import Login from './componets/Login';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <AuthProvider >
        <NavBar />
        <Route exact path="/">
          <Home />
        </Route>
        <AuthRoute path="/signup">
          <SignUp />
        </AuthRoute>
        <AuthRoute path="/login">
          <Login />
        </AuthRoute>
      </AuthProvider>
    </div>
  );
}

export default App;
