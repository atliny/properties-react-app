import { useParams, useNavigate } from "react-router-dom";

import propertiesData from "./data/properties.json";
import "./PropertyPage.css";

export default function PropertyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const property = propertiesData.properties.find(p => p.id === id);

  if (!property) {
    return (
      <div className="error-message">
        <h2>Property not found</h2>
        <button onClick={() => navigate("/")}>Back to Search</button>
      </div>
    );
  }

  return (
    <div className="property-page">
      <button onClick={() => navigate(-1)} className="back-button">
        ←
      </button>
      
      <div className="image">
        <img 
          src={property.picture} 
          alt={property.type}
        />
      </div>

      <div className="property-details">
        <h1>{property.type}</h1>
        <p><strong>Location:</strong> {property.location}</p>
        <p><strong>Price:</strong> £{property.price.toLocaleString()}</p>
        <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
        <p><strong>Tenure:</strong> {property.tenure}</p>
        <p className="property-description">{property.description}</p>
      </div>
    </div>
  );
}