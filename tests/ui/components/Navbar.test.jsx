import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../src/auth";
import { Navbar } from "../../../src/ui";

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("Testing Navbar", () => {
  const contextValue = {
    logged: true,
    user: {
      id: "123",
      name: "Margarita",
    },
    logout: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );
  });
  test("should display the user's name", () => {
    expect(screen.getByText("Margarita")).toBeTruthy();
  });

  test("should call logout and navigate when the user clicks the logout button", () => {
    const logoutButton = screen.getByRole("button");

    fireEvent.click(logoutButton);

    expect(contextValue.logout).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalledWith("/login", { replace: true });
  });
});
