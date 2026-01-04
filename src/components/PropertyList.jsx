import React from "react";
import { useNavigate } from "react-router-dom";
import propertiesData from "../data/properties.json";
import "./PropertyCard.css";

export default function PropertyList({
  properties,
  favourites = [],
  onToggleFavourite
}) {
  const navigate = useNavigate();
  
  const propertyArray = properties || propertiesData.properties;

  const isFavourite = (id) =>
    favourites.some((fav) => fav.id === id);

  const handleDragStart = (e, property) => {
    e.dataTransfer.setData(
      "application/property",
      JSON.stringify(property)
    );
    e.dataTransfer.effectAllowed = "copy";
  };

  const handleCardClick = (id) => {
    navigate(`/property/${id}`);
  };

  const handleHeartClick = (e, property) => {
    e.stopPropagation();
    if (onToggleFavourite) {
      onToggleFavourite(property);
    }
  };

  return (
    <div className="property-list">
      {propertyArray.map((prop) => (
        <div
          key={prop.id}
          className="property-card"
          draggable
          onDragStart={(e) => handleDragStart(e, prop)}
          onClick={() => handleCardClick(prop.id)}
        >
          <div className="property-image-container">
            <img
              src={prop.picture}
              alt={`${prop.type} in ${prop.location}`}
              className="property-image"
            />
          </div>

          <div className="property-info">
            <h3>
              {prop.type} – £{prop.price.toLocaleString()}
            </h3>

            <p>
              <strong>Bedrooms:</strong> {prop.bedrooms} |{" "}
              <strong>Tenure:</strong> {prop.tenure}
            </p>

            <p>
              <strong>Location:</strong> {prop.location}
            </p>

            <p className="property-description">
              {prop.description.length > 150
                ? prop.description.slice(0, 150) + "..."
                : prop.description}
            </p>

            <p className="property-added">
              Added: {prop.added.day} {prop.added.month}{" "}
              {prop.added.year}
            </p>

            <button className="view-btn">
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
