import { fireEvent, render, screen } from "@testing-library/react";

import { MemoryRouter, useNavigate } from "react-router-dom";
import { SearchPage } from "../../../src/heroes";

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));
describe("Testing Search Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("should render correctly with the default values", () => {
    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });
  test("should display batman and the input with the queryString", () => {
    render(
      <MemoryRouter initialEntries={["/search?q=batman"]}>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByRole("textbox");
    expect(input.value).toBe("batman");

    const image = screen.getByRole("img");
    expect(image.src).toContain("/assets/heroes/dc-batman.jpg");
  });

  test("should show an error if the searched hero does not exist", () => {
    render(
      <MemoryRouter initialEntries={["/search?q=batman123"]}>
        <SearchPage />
      </MemoryRouter>
    );

    expect(screen.getByText("No hero with")).toBeTruthy();
  });

  test("should call navigate when going to the new page", () => {
    render(
      <MemoryRouter initialEntries={["/search?q=batman"]}>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "green lantern" } });
    const searchBtn = screen.getByRole("button", { name: "Search" });

    fireEvent.click(searchBtn);

    expect(mockedUseNavigate).toHaveBeenCalledWith("?q=green lantern");
  });
});
