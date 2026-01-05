import { render, screen, fireEvent } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import SearchPage from "./SearchPage";

jest.mock("./components/PropertyList", () => () => (
  <div>PropertyList</div>
));

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("SearchPage", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test("renders hero section and search input", () => {
    render(
      <HashRouter>
        <SearchPage />
      </HashRouter>
    );

    expect(
      screen.getByRole("heading", { name: /House Hunting Made Simple/i })
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(/city, street, or postcode/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /search/i })
    ).toBeInTheDocument();
  });

  test("updates input value when typing", () => {
    render(
      <HashRouter>
        <SearchPage />
      </HashRouter>
    );

    const input = screen.getByPlaceholderText(/city, street, or postcode/i);

    fireEvent.change(input, { target: { value: "London" } });

    expect(input.value).toBe("London");
  });

  test("navigates to results page when search is clicked", () => {
    render(
      <HashRouter>
        <SearchPage />
      </HashRouter>
    );

    fireEvent.change(
      screen.getByPlaceholderText(/city, street, or postcode/i),
      { target: { value: "London" } }
    );

    fireEvent.click(
      screen.getByRole("button", { name: /search/i })
    );

    expect(mockNavigate).toHaveBeenCalledWith("/results?city=London");
  });

  test("does not navigate when search input is empty", () => {
    render(
      <HashRouter>
        <SearchPage />
      </HashRouter>
    );

    fireEvent.click(
      screen.getByRole("button", { name: /search/i })
    );

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test("renders PropertyList component", () => {
    render(
      <HashRouter>
        <SearchPage />
      </HashRouter>
    );

    expect(
      screen.getByText(/propertylist/i)
    ).toBeInTheDocument();
  });
});
