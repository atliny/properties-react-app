import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropertyList from "./components/PropertyList";
import "./SearchPage.css";

export default function SearchPage() {
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!city.trim()) return;
    navigate(`/results?city=${encodeURIComponent(city)}`);
  };

  return (
    <>
    <section className="hero">
      <div className="hero-overlay">
        <h1>House Hunting Made Simple</h1>
        <p>Supporting your dreams, one property at a time.</p>

        <div className="hero-searchbar">
          <input
            type="text"
            placeholder="City, street, or postcode"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
    </section>
    <section className="properties-section">
      <PropertyList />
    </section>
    </>
  );
}
