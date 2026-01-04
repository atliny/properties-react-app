import { useState } from "react";
import propertiesData from "../data/properties.json";
import "./FavouritesList.css";

export default function FavouritesList() {
  const [favourites, setFavourites] = useState([]);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const properties = propertiesData.properties;

  const isFavourite = (property) =>
    favourites.some((fav) => fav.id === property.id);

  const addFavourite = (property) => {
    if (!isFavourite(property)) {
      setFavourites([...favourites, property]);
    }
  };

  const removeFavourite = (id) => {
    setFavourites(favourites.filter((p) => p.id !== id));
  };

  const handleDragStart = (e, property) => {
    e.dataTransfer.setData(
      "application/property",
      JSON.stringify(property)
    );
    e.dataTransfer.effectAllowed = "copy";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
    
    try {
      const property = JSON.parse(
        e.dataTransfer.getData("application/property")
      );
      addFavourite(property);
    } catch (error) {
      console.error("Error parsing dropped property:", error);
    }
  };

  return (
    <div className="favourites-layout">
      <aside
        className={`favourites-sidebar ${isDraggingOver ? "drag-over" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <h3>Favourites</h3>

        {favourites.length === 0 && (
          <p className="drop-hint">
            Drag properties here to add favourites
          </p>
        )}

        {favourites.map((property) => (
          <div
            key={property.id}
            className="favourite-item"
          >
            <span>
              📍 {property.location}
              <br />
              <small>
                £{property.price.toLocaleString()}
              </small>
            </span>
            <button
              onClick={() => removeFavourite(property.id)}
              aria-label="Remove from favourites"
              title="Remove from favourites"
            >
              X
            </button>
          </div>
        ))}
      </aside>
    </div>
  );
}