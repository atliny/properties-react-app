import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import SearchForm from "./components/SearchForm";
import PropertyList from "./components/PropertyList";
import propertiesData from "./data/properties.json";
import FavouritesList from "./components/FavouritesList";

import "./ResultsPage.css";

export default function ResultsPage() {
  const [params] = useSearchParams();
  const [favourites, setFavourites] = useState([]);
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useState({
    city: params.get("city") || "",
    minPrice: "",
    maxPrice: "",
    minBeds: "",
    maxBeds: "",
    propertyType: "Any",
    added: "Anytime",
  });

  const handleSearch = (filters) => {
    setSearchParams(filters);
  };

  const handleToggleFavourite = (property) => {
    setFavourites(prev => {
      const isFav = prev.some(fav => fav.id === property.id);
      if (isFav) {
        return prev.filter(fav => fav.id !== property.id);
      } else {
        return [...prev, property];
      }
    });
  };

  const minPrice = Number(searchParams.minPrice) || 0;
  const maxPrice = Number(searchParams.maxPrice) || Infinity;
  const minBeds = Number(searchParams.minBeds) || 0;
  const maxBeds = Number(searchParams.maxBeds) || Infinity;

  const filteredProperties = propertiesData.properties.filter((p) => (
    p.location.toLowerCase().includes(searchParams.city.toLowerCase()) &&
    p.price >= minPrice &&
    p.price <= maxPrice &&
    p.bedrooms >= minBeds &&
    p.bedrooms <= maxBeds &&
    (searchParams.propertyType === "Any" || p.type === searchParams.propertyType)
  ));

  return (
    <main className="results-page">
      <button onClick={() => navigate(-1)} className="back-button">
        ←
      </button>
      <div className="search-form">
        <SearchForm city={searchParams.city} onSearch={handleSearch} />
      </div>
      
      <div className="results">
        <h2 id="results-heading">
          Found {filteredProperties.length} properties in {searchParams.city || "all areas"}
        </h2>
        <PropertyList 
          properties={filteredProperties}
          favourites={favourites}
          onToggleFavourite={handleToggleFavourite}
        />
      </div>
      <FavouritesList />
    </main>
  );
}