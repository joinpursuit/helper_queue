import React from "react";
import { render, screen, wait, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { createMemoryHistory } from "history";
import NavBar from "../NavBar";
import { AuthContext } from "../../providers/AuthProvider";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from '../../store';

jest.mock("../auth/NavLogin", () => {
  const NavLogin =() => <div data-testid="navLogin">Login In</div>;
  return NavLogin
});

test("home page of non user shows <NavLogin />", () => {

    const history = createMemoryHistory();
    const { container } = render(
        <Provider store={store}>
      <Router history={history}>
        <AuthContext.Provider value={{ token: "1234", currentUser: null }}>
          <NavBar />
        </AuthContext.Provider>
      </Router>
    </Provider>
  );
    expect(screen.getByTestId("navLogin")).toBeInTheDocument()
});



//   const store = {
//       getState: () => ({
//     auth: { currentUser: null },
//     filter: {
//       rejected: false,
//       wishlist: false,
//       applied: true,
//       phoneScreen: false,
//       codingChallenge: false,
//       offer: false 
//     },
//     jobs: {},
//     modal: { jobFormShow: false, selectedJob: null, jobTimelineShow: false },
//     pagination: { startIdx: 0, endIdx: 15, page: 0 },
//     search: "",
//   })
//   }