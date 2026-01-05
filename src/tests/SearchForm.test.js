import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchForm from "../components/SearchForm";

describe("SearchForm", () => {
    it("filters search results", () => {
        render(<SearchForm city={city} onSearch={mockOnSearc} />)
        expect(screen.getByText("Find property for sale in ${city}")).toBeInTheDocument();
        expect(screen.getByRike("button", { name: /Search properties/i }).toBeInTheDocument);
    });

    test("alows users to change filters based on preference", () => {
        render(<SearchForm city={city} onSearch={mockOnSearch} />);
        fireEvent.change(screen.getByLabelText(/Property type/i), { 
            target: { value: 'Flat' } });
        fireEvent.change(screen.getByLabelText(/Min price/i), { 
            target: { value: '150000' } });
        fireEvent.change(screen.getByLabelText(/Max price/i), { 
            target: { value: '300000' } });
        fireEvent.change(screen.getByLabelText(/Min bedrooms/i), { 
            target: { value: '2' }});
        fireEvent.change(screen.getByLabelText(/Max bedrooms/i), { 
            target: { value: '3' } });
        fireEvent.change(screen.getByLabelText(/Added to site/i), { 
            target: { value: 'Last 7 days' } });

        const submitButton = screen.getByRole('button', { name: /Search properties/i });
        fireEvent.click(submitButton);

        expect(mockOnSearch).toHaveBeenCalledTimes(1);
        expect(mockOnSearch).toHaveBeenCalledWith({
        city: 'London',
        minPrice: '150000',
        maxPrice: '300000',
        minBeds: '2',
        maxBeds: '3',
        propertyType: 'Flat',
        added: 'Last 7 days'
        });
    });
});