import { useState } from "react";

export default function SearchForm({ city, onSearch }) {
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    minBeds: "",
    maxBeds: "",
    propertyType: "Any",
    added: "Anytime"
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const searchParams = {
      city,
      ...filters
    };

    if (onSearch) {
      onSearch(searchParams);
    } else {
      console.log("Search parameters:", searchParams);
      alert(`Search parameters:\n${JSON.stringify(searchParams, null, 2)}`);
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <h2>Find property for sale in {city}</h2>

      <div className="form-grid">
        <div>
          <label>Property type</label>
          <select name="propertyType" onChange={handleChange} value={filters.propertyType}>
            <option>Any</option>
            <option>House</option>
            <option>Flat</option>
            <option>Bungalow</option>
            <option>Land</option>
            <option>Commercial Property</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label>Added to site</label>
          <select name="added" onChange={handleChange} value={filters.added}>
            <option>Anytime</option>
            <option>Last 24 hours</option>
            <option>Last 7 days</option>
          </select>
        </div>

        <div>
          <label>Price range (£)</label>
          <div className="range">
            <select name="minPrice" onChange={handleChange} value={filters.minPrice}>
              <option value="">No min</option>
              <optiion value="-50000">-50,000</optiion>
              <option value="50000">50,000</option>
              <option value="60000">60,000</option>
              <option value="70000">70,000</option>
              <option value="80000">80,000</option>
              <option value="90000">90,000</option>
              <option value="100000">100,000</option>
              <option value="110000">110,000</option>
              <option value="120000">120,000</option>
              <option value="130000">130,000</option>
              <option value="140000">140,000</option>
              <option value="150000">150,000</option>
              <option value="160000">160,000</option>
              <option value="170000">170,000</option>
              <option value="180000">180,000</option>
              <option value="190000">190,000</option>
              <option value="200000">200,000</option>
              <option value="210000">210,000</option>
              <option value="220000">220,000</option>
              <option value="230000">230,000</option>
              <option value="240000">240,000</option>
              <option value="250000">250,000</option>
              <option value="260000">260,000</option>
              <option value="260000">260,000</option>
              <option value="270000">270,000</option>
              <option value="280000">280,000</option>
              <option value="290000">290,000</option>
              <option value="300000">300,000</option>
              <option value="310000">310,000</option>
              <option value="320000">320,000</option>
              <option value="330000">330,000</option>
              <option value="340000">340,000</option>
              <option value="350000">350,000</option>
              <option value="360000">360,000</option>
              <option value="360000">360,000</option>
              <option value="370000">370,000</option>
              <option value="380000">380,000</option>
              <option value="390000">390,000</option>
              <option value="400000">400,000</option>
              <option value="410000">410,000</option>
              <option value="420000">420,000</option>
              <option value="430000">430,000</option>
              <option value="440000">440,000</option>
              <option value="450000">450,000</option>
              <option value="460000">460,000</option>
              <option value="460000">460,000</option>
              <option value="470000">470,000</option>
              <option value="480000">480,000</option>
              <option value="490000">490,000</option>
              <option value="500000">500,000</option>
              <option value="510000">510,000</option>
              <option value="520000">520,000</option>
              <option value="530000">530,000</option>
              <option value="540000">540,000</option>
              <option value="550000">550,000</option>
            </select>
            <select name="maxPrice" onChange={handleChange} value={filters.maxPrice}>
              <option value="">No max</option>
              <option value="">No min</option>
              <option value="50000">50,000</option>
              <option value="60000">60,000</option>
              <option value="70000">70,000</option>
              <option value="80000">80,000</option>
              <option value="90000">90,000</option>
              <option value="100000">100,000</option>
              <option value="110000">110,000</option>
              <option value="120000">120,000</option>
              <option value="130000">130,000</option>
              <option value="140000">140,000</option>
              <option value="150000">150,000</option>
              <option value="160000">160,000</option>
              <option value="170000">170,000</option>
              <option value="180000">180,000</option>
              <option value="190000">190,000</option>
              <option value="200000">200,000</option>
              <option value="210000">210,000</option>
              <option value="220000">220,000</option>
              <option value="230000">230,000</option>
              <option value="240000">240,000</option>
              <option value="250000">250,000</option>
              <option value="260000">260,000</option>
              <option value="260000">260,000</option>
              <option value="270000">270,000</option>
              <option value="280000">280,000</option>
              <option value="290000">290,000</option>
              <option value="300000">300,000</option>
              <option value="310000">310,000</option>
              <option value="320000">320,000</option>
              <option value="330000">330,000</option>
              <option value="340000">340,000</option>
              <option value="350000">350,000</option>
              <option value="360000">360,000</option>
              <option value="360000">360,000</option>
              <option value="370000">370,000</option>
              <option value="380000">380,000</option>
              <option value="390000">390,000</option>
              <option value="400000">400,000</option>
              <option value="410000">410,000</option>
              <option value="420000">420,000</option>
              <option value="430000">430,000</option>
              <option value="440000">440,000</option>
              <option value="450000">450,000</option>
              <option value="460000">460,000</option>
              <option value="460000">460,000</option>
              <option value="470000">470,000</option>
              <option value="480000">480,000</option>
              <option value="490000">490,000</option>
              <option value="500000">500,000</option>
              <option value="510000">510,000</option>
              <option value="520000">520,000</option>
              <option value="530000">530,000</option>
              <option value="540000">540,000</option>
              <option value="550000">550,000</option>
              <option value="550000+">550000+</option>
            </select>
          </div>
        </div>

        <div>
          <label>No. of bedrooms</label>
          <div className="range">
            <select name="minBeds" onChange={handleChange} value={filters.minBeds}>
              <option value="">No min</option>
              <option value="studio">Studio</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <select name="maxBeds" onChange={handleChange} value={filters.maxBeds}>
              <option value="">No max</option>
              <option value="studio">Studio</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="5+">5+</option>
            </select>
          </div>
        </div>
      </div>

      <button className="search-btn" type="submit">
        Search properties
      </button>
    </form>
  );
}
