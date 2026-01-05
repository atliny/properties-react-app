import { render, screen, fireEvent } from "@testing-library/react";
import { HashRouter, Routes, Route } from "react-router-dom";
import PropertyPage from "../PropertyPage";

jest.mock("./data/properties.json", () => ({
  properties: [
    {
        id: 1,
        type: "House",
        price: 250000,
        location: "London",
        bedrooms: 3,
        tenure: "Freehold",
        description: "Beautiful house",
        picture: "/images/house1.jpg",
        added: { 
            day: 15, 
            month: "January", 
            year: 2024 
        }
    },
  ],
}));

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("PropertyPage", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test("renders property details", () => {
    render(
      <HashRouter initialEntries={["/property/prop1"]}>
        <Routes>
          <Route path="/property/:id" element={<PropertyPage />} />
        </Routes>
      </HashRouter>
    );

    expect(screen.getByRole("heading", { name: /house/i }))
      .toBeInTheDocument();

    expect(screen.getByText(/location:/i))
      .toHaveTextContent("London");

    expect(screen.getByText(/price:/i))
      .toHaveTextContent("£250,000");

    expect(screen.getByText(/bedrooms:/i))
      .toHaveTextContent("3");

    expect(screen.getByText(/tenure:/i))
      .toHaveTextContent("Freehold");

    expect(screen.getByText(/Beautiful house/i))
      .toBeInTheDocument();
  });

  test("navigates back when back arrow is clicked", () => {
    render(
      <HashRouter initialEntries={["/property/prop1"]}>
        <Routes>
          <Route path="/property/:id" element={<PropertyPage />} />
        </Routes>
      </HashRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: "←" }));

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test("shows error message when no property is found", () => {
    render(
      <HashRouter initialEntries={["/property/invalid-id"]}>
        <Routes>
          <Route path="/property/:id" element={<PropertyPage />} />
        </Routes>
      </HashRouter>
    );

    expect(
      screen.getByText(/property not found/i)
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", { name: /back to search/i })
    );

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});