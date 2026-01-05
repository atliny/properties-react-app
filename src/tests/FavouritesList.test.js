import { render, screen, fireEvent } from "@test-library/react";
import FavouritesList from "../components/FavouritesList";

jest.mock("../data/properties.json", () => ({
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
        {
            id: 2,
            type: "Flat",
            price: 180000,
            location: "Manchester",
            bedrooms: 2,
            tenure: "Leasehold",
            description: "Cozy flat",
            picture: "/images/flat1.jpg",
            added: { 
                day: 20, 
                month: "February", 
                year: 2024 
            }
        }
    ],
}));

describe('FavouritesList', () => {
  beforeEach(() => {
    jest.clearAllMocks();});

  test('renders favourites sidebar', () => {
    render(<FavouritesList />);
    
    expect(screen.getByText('Favourites')).toBeInTheDocument();});

  test('displays drop hint when no favourites', () => {
    render(<FavouritesList />);
    
    expect(screen.getByText('Drag properties here to add favourites')).toBeInTheDocument();});

  test('adds property on drop', () => {
    render(<FavouritesList />);
    
    const sidebar = screen.getByText('Favourites').closest('.favourites-sidebar');
    
    const property = {
      id: 1,
      type: "House",
      price: 250000,
      location: "London",
      bedrooms: 3
    };
    
    const dataTransfer = {
      getData: jest.fn(() => JSON.stringify(property)),
      dropEffect: null};
    
    fireEvent.dragOver(sidebar, { dataTransfer });
    fireEvent.drop(sidebar, { dataTransfer });
    
    expect(screen.getByText('📍 London')).toBeInTheDocument();
    expect(screen.getByText('£250,000')).toBeInTheDocument();
    });

    test('does not add duplicate favourites', () => {
    render(<FavouritesList />);
    
    const sidebar = screen.getByText('Favourites').closest('.favourites-sidebar');
    
    const property = {
      id: 1,
      type: 'House',
      price: 250000,
      location: 'London',
      bedrooms: 3
    };
    
    const dataTransfer = {
      getData: jest.fn(() => JSON.stringify(property)),
      dropEffect: null
    };
    
    // Drop the same property twice
    fireEvent.drop(sidebar, { dataTransfer });
    fireEvent.drop(sidebar, { dataTransfer });
    
    const favouriteItems = screen.getAllByText('📍 London');
    expect(favouriteItems).toHaveLength(1);
  });

  test('removes favourite when X button clicked', () => {
    render(<FavouritesList />);
    
    const sidebar = screen.getByText('Favourites').closest('.favourites-sidebar');
    
    const property = {
      id: 1,
      type: 'House',
      price: 250000,
      location: 'London',
      bedrooms: 3
    };
    
    const dataTransfer = {
      getData: jest.fn(() => JSON.stringify(property)),
      dropEffect: null
    };
    
    fireEvent.drop(sidebar, { dataTransfer });
    
    expect(screen.getByText('📍 London')).toBeInTheDocument();
    
    const removeButton = screen.getByRole('button', { name: 'Remove from favourites' });
    fireEvent.click(removeButton);
    
    expect(screen.queryByText('📍 London')).not.toBeInTheDocument();
    expect(screen.getByText('Drag properties here to add favourites')).toBeInTheDocument();
});

  test('displays multiple favourites', () => {
    render(<FavouritesList />);
    
    const sidebar = screen.getByText('Favourites').closest('.favourites-sidebar');
    
    const property1 = {
      id: 1,
      price: 250000,
      location: 'London'
    };
    
    const property2 = {
      id: 2,
      price: 180000,
      location: 'Manchester'
    };
    
    const dataTransfer1 = {
      getData: jest.fn(() => JSON.stringify(property1)),
      dropEffect: null
    };
    
    const dataTransfer2 = {
      getData: jest.fn(() => JSON.stringify(property2)),
      dropEffect: null
    };
    
    fireEvent.drop(sidebar, { dataTransfer: dataTransfer1 });
    fireEvent.drop(sidebar, { dataTransfer: dataTransfer2 });
    
    expect(screen.getByText('📍 London')).toBeInTheDocument();
    expect(screen.getByText('📍 Manchester')).toBeInTheDocument();
    expect(screen.getByText('£250,000')).toBeInTheDocument();
    expect(screen.getByText('£180,000')).toBeInTheDocument();
  });
});
