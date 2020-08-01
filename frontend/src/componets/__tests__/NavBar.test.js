import React from "react";
import { render, screen, wait, fireEvent } from "@testing-library/react";
import { getRoles } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import { createMemoryHistory } from "history";
import NavBar from "../NavBar";
import { AuthContext } from "../../providers/AuthProvider";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../store";
import JobPage from "../../features/jobs/JobPage";

jest.mock("../auth/NavLogin.js", () => {
  const NavLogin = () => <div data-testid="navLogin">Login In</div>;
  return NavLogin;
});

jest.mock("../RequestHelp.js", () => {
  const RequestHelp = () => <div data-testid="requestButton">Request Help</div>;
  return RequestHelp;
});


test("home page of non user shows <NavLogin />", () => {
  const history = createMemoryHistory();
  render(
    <Provider store={store}>
      <Router history={history}>
        <AuthContext.Provider value={{ token: "1234", currentUser: null }}>
          <NavBar />
        </AuthContext.Provider>
      </Router>
    </Provider>
  );
  let nav = screen.getByRole("navigation");
  let login = screen.getByTestId("navLogin");
  expect(nav.children).toHaveLength(1);
  expect(login.parentElement).toBe(nav);
  expect(login).toBeInTheDocument();
});

test("home page ('/') of regular user (non admin) renders correct items", () => {
  const history = createMemoryHistory();
  render(
    <Provider store={store}>
      <Router history={history}>
        <AuthContext.Provider
          value={{ token: "1234", currentUser: { email: "test@test.com" } }}
        >
          <NavBar />
        </AuthContext.Provider>
      </Router>
    </Provider>
  );
  let nav = screen.getByRole("navigation");
  let jobTracker = screen.getByRole("link");
  expect(nav.children).toHaveLength(2);
  expect(jobTracker).toHaveTextContent("Job Tracker");

  expect(screen.getByRole("button")).toHaveTextContent("Log Out");
  expect(screen.getByTestId("requestButton")).toBeInTheDocument();
});

test("/jobtracker renders correct items", () => {
  const history = createMemoryHistory();
  history.push("/jobtracker");
  render(
    <Provider store={store}>
      <Router history={history}>
        <AuthContext.Provider
          value={{ token: "1234", currentUser: { email: "test@test.com" } }}
        >
          <NavBar />
        </AuthContext.Provider>
      </Router>
    </Provider>
  );
  let nav = screen.getByRole("navigation");
  let home = screen.getByRole("link");
  expect(nav.children).toHaveLength(3);
  expect(home).toHaveTextContent("Home");

  expect(screen.getByText("Log Out")).toBeInTheDocument();
  expect(screen.getByText("+ Add Job")).toBeInTheDocument();
  expect(screen.getByText("You've applied to 0 jobs!")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
});


// test("/jobtracker Add Job opens modal", () => {
//   const history = createMemoryHistory();
//   history.push("/jobtracker");
//   render(
//     <Provider store={store}>
//       <Router history={history}>
//         <AuthContext.Provider
//           value={{ token: "1234", currentUser: { email: "test@test.com" } }}
//         >
//           <NavBar />
//           <JobPage />
//         </AuthContext.Provider>
//       </Router>
//     </Provider>
//   );
//   let jobFormModal = screen.queryByTestId("jobFormModal");
//   let addJob = screen.getByText("+ Add Job");
//   expect(addJob).toBeInTheDocument();
//   expect(jobFormModal).not.toBeInTheDocument();
//   fireEvent.click(addJob)
// //   jobFormModal = screen.queryByTestId("jobFormModal");
// //   wait(() => expect(jobFormModal).toBeInTheDocument());
// });
