import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../src/auth/context/AuthContext";

import { PublicRoute } from "../../src/router/PublicRoute";

describe("Testing PublicRoute", () => {
  test("if the user is not authenticated it should show the children", () => {
    const contextValue = {
      logged: false,
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <PublicRoute>
            <h1>Public Route</h1>
          </PublicRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText(/public route/i)).toBeTruthy();
  });

  test("if the user is authenticated it should navigate", () => {
    const contextValue = {
      logged: true,
      user: { id: "123", name: "Margarita" },
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            <Route
              path="login"
              element={
                <PublicRoute>
                  <h1>Public Route</h1>
                </PublicRoute>
              }
            />
            <Route path="marvel" element={<h1>Marvel Page</h1>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText("Marvel Page")).toBeTruthy();
  });
});
