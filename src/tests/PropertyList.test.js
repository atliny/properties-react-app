import { render, screen, fireEvent } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import PropertyList from "./PropertyList";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockProperties = [
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
];

describe("PropertyList", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test("renders property details correctly", () => {
    render(
      <HashRouter>
        <PropertyList properties={mockProperties} />
      </HashRouter>
    );

    expect(
      screen.getByText(/House – £250,000/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/bedrooms:/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/location:/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /View details/i })
    ).toBeInTheDocument();
  });

  test("navigates to property details page when card is clicked", () => {
    render(
      <HashRouter>
        <PropertyList properties={mockProperties} />
      </HashRouter>
    );

    fireEvent.click(
      screen.getByText(/House – £250,000/i)
    );

    expect(mockNavigate).toHaveBeenCalledWith("/property/prop1");
  });

  test("sets drag data when dragging a property card", () => {
    render(
      <HashRouter>
        <PropertyList properties={mockProperties} />
      </HashRouter>
    );

    const card = screen
      .getByText(/House – £250,000/i)
      .closest(".property-card");

    const dataTransfer = {
      setData: jest.fn(),
      effectAllowed: "",
    };

    fireEvent.dragStart(card, { dataTransfer });

    expect(dataTransfer.setData).toHaveBeenCalledWith(
      "application/property",
      JSON.stringify(mockProperties[0])
    );
  });

  test("uses fallback properties when none are provided", () => {
    render(
      <HashRouter>
        <PropertyList />
      </HashRouter>
    );

    expect(
      document.querySelectorAll(".property-card").length
    ).toBeGreaterThan(0);
  });
});
