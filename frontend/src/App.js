import React from 'react';
import './App.css';
import Home from './componets/Home';
import NavBar from './componets/NavBar';
import AuthProvider from './providers/AuthProvider';
import { AuthRoute, ProtectedRoute, AdminRoute } from './util/auth_routes';
import SignUp from './componets/auth/SignUp';
import Login from './componets/auth/Login';
import { Route } from 'react-router-dom';
import Student from './componets/views/Student';
import Admin from './componets/views/Admin';
import Gong from './componets/Gong';

function App() {
  return (
    <div className="App">
      <AuthProvider >
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
        <AdminRoute path="/admin" >
          <Admin />
        </AdminRoute>
        <Route path="/gong" >
          <Gong />
        </Route>
      </AuthProvider>
    </div>
  );
}

export default App;
