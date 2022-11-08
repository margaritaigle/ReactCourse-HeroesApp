import { PrivateRoute } from "../../src/router/PrivateRoute";
import { AuthContext } from "../../src/auth/context/AuthContext";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("Testing Private Route", () => {
  test("if the user is authenticated it should show the children", () => {
    Storage.prototype.setItem = jest.fn();

    const contextValue = {
      logged: true,
      user: { id: "123", name: "Margarita" },
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/search?q=batman"]}>
          <PrivateRoute>
            <h1>Private Route</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText(/private route/i)).toBeTruthy();

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "lastPath",
      "/search?q=batman"
    );
  });
});
