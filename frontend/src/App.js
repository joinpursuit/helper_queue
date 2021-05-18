import React from "react";
import "./App.css";
import NavBar from "./features/navbar/NavBar";
import AuthProvider from "./providers/AuthProvider";
import { AuthRoute, ProtectedRoute, AdminRoute } from "./util/auth_routes";
import SignUp from "./features/auth/SignUp";
import Login from "./features/auth/Login";
import { Route } from "react-router-dom";
import Student from "./features/views/Student";
import Admin from "./features/views/Admin";
import JobPage from "./features/jobs/JobPage";
import ErrorBoundaries from "./features/ErrorBoundaries/ErrorBoundaries";
import ClientRefresh from "./ClientRefresh";
import SocketProvider from "./providers/SocketProvider";
import AutoReload from "./AutoReload";
import NetworkProvider from "./providers/NetworkProvider";
import JobStats from "./features/jobs/Stats/JobStats";
import ForgotPassword from "./features/auth/ForgotPassword";
import Gong from './features/gong/Gong';
import Pairs from './features/pairs/Pairs';
import CreatePairList from "./features/pairs/CreatePairList";
import EditPairList from "./features/pairs/EditPairList";
import ShowPairList from "./features/pairs/ShowPairList";
import UpdateFellow from "./features/updateFellow/UpdateFellow"

function App() {
  return (
    <div className="App">
      <ErrorBoundaries>
        <AuthProvider>
          <SocketProvider>
            <NetworkProvider>
              <NavBar />
              <ClientRefresh />
              <AutoReload
                url="/index.html"
                tryDelay={10 * 60 * 1000}
                forceDelay={24 * 60 * 60 * 1000}
              />
              <ErrorBoundaries>
                <Route exact path="/">
                  <Student />
                </Route>
                <AuthRoute path="/signup">
                  <SignUp />
                </AuthRoute>
                <AuthRoute path="/forgotpassword">
                  < ForgotPassword />
                </AuthRoute>
                <AuthRoute path="/login">
                  <Login />
                </AuthRoute>
                <AdminRoute path="/admin">
                  <Admin />
                </AdminRoute>
                <AdminRoute exact path="/pairs">
                  <Pairs />
                </AdminRoute>
                <AdminRoute exact path="/pairs/create">
                  <CreatePairList />
                </AdminRoute>
                <AdminRoute exact path="/pairs/view/:id">
                  <ShowPairList />
                </AdminRoute>
                <AdminRoute exact path="/pairs/edit/:id">
                  <EditPairList />
                </AdminRoute>
                <AdminRoute exact path="/updateFellow">
                  <UpdateFellow />
                </AdminRoute>
                <ProtectedRoute path="/jobtracker">
                  <JobPage />
                </ProtectedRoute>
                <ProtectedRoute path="/stats/jobtracker">
                  <JobStats/>
                </ProtectedRoute>
                <ProtectedRoute path="/gong">
                  <Gong/>
                </ProtectedRoute>
              </ErrorBoundaries>
            </NetworkProvider>
          </SocketProvider>
        </AuthProvider>
      </ErrorBoundaries>
    </div>
  );
}

export default App;
