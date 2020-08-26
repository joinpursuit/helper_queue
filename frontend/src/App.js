import React from "react";
import "./App.css";
import NavBar from "./componets/NavBar";
import AuthProvider from "./providers/AuthProvider";
import { AuthRoute, ProtectedRoute, AdminRoute } from "./util/auth_routes";
import SignUp from "./componets/auth/SignUp";
import Login from "./componets/auth/Login";
import { Route } from "react-router-dom";
import Student from "./componets/views/Student";
import Admin from "./componets/views/Admin";
import JobPage from "./features/jobs/JobPage";
import ErrorBoundaries from "./componets/ErrorBoundaries/ErrorBoundaries";
import ClientRefresh from "./ClientRefresh";
import SocketProvider from "./providers/SocketProvider";

function App() {
  return (
    <div className="App">
      <ErrorBoundaries>
        <SocketProvider>
          <AuthProvider>
            <NavBar />
            <ClientRefresh />
            <ErrorBoundaries>
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
              <ProtectedRoute path="/jobtracker">
                <JobPage />
              </ProtectedRoute>
            </ErrorBoundaries>
          </AuthProvider>
        </SocketProvider>
      </ErrorBoundaries>
    </div>
  );
}

export default App;
