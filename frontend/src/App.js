import React from 'react';
import './App.css';
import Home from './componets/Home';
import NavBar from './componets/NavBar';
import AuthProvider from './providers/AuthProvider';
import { AuthRoute, ProtectedRoute, AdminRoute } from './util/auth_routes';
import SignUp from './componets/SignUp';
import Login from './componets/Login';
import RequestHelp from './componets/RequestHelp';
import { Route } from 'react-router-dom';
import TicketIndex from './componets/tickets/TicketIndex';
import Student from './componets/views/Student';
import Admin from './componets/views/Admin';

function App() {
  return (
    <div className="App">
      <AuthProvider >
      <NavBar />
        <ProtectedRoute exact path="/">
          <Student />
        </ProtectedRoute>
        <AuthRoute path="/signup">
          <SignUp />
        </AuthRoute>
        <AuthRoute path="/login">
          <Login />
        </AuthRoute>
        <AdminRoute path="/admin" >
          <Admin />
        </AdminRoute>
      </AuthProvider>
    </div>
  );
}

export default App;
