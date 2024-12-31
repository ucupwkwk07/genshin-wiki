import React, { useEffect, useState } from "react";
import axios from "axios"; 
import { useParams } from "react-router-dom";
import "./ArtifactDetail.css";

const ArtifactDetails = () => {
  const { id } = useParams(); 
  const [artifact, setArtifact] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const API_URL = `/api/artifacts`;

  useEffect(() => {
    const fetchArtifact = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        if (response.data.success) {
          setArtifact(response.data.data); 
        } else {
          setError(response.data.message || "Failed to fetch artifact details.");
        }
      } catch (err) {
        setError("An error occurred while fetching the artifact details.");
        console.error(err.message);
      } finally {
        setLoading(false); 
      }
    };
    fetchArtifact();
  }, [id]);

  if (loading) {
    return <p className="loading-message">Loading artifact details...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="artifact-detail">
      {artifact ? (
        <>
          <div className="artifact-image-container">
            <img
              src={artifact.image}
              alt={artifact.name}
              className="artifact-image"
            />
          </div>
          <div className="artifact-info">
            <h1>
              {artifact.name}
              <span className="artifact-rarity">
                <img src={artifact.rarity} alt="Rarity" />
              </span>
            </h1>
            <p className="artifact-bonus">
              <strong>Bonus 2:</strong> {artifact.bonus2}
            </p>
            <p className="artifact-bonus">
              <strong>Bonus 4:</strong> {artifact.bonus4}
            </p>
            <p>{artifact.description}</p>
          </div>
        </>
      ) : (
        <p className="no-data-message">Artifact details not found.</p>
      )}
    </div>
  );
};

export default ArtifactDetails;
