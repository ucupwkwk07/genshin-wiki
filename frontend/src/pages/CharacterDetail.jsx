import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCharacterStore } from "../store/character";
import "./CharacterDetail.css";

const CharacterDetail = () => {
  const { id } = useParams(); // Get the ID from the URL
  const { fetchCharacterDetail } = useCharacterStore(); // Access Zustand function
  const [character, setCharacter] = useState(null); // State for character data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const loadCharacter = async () => {
      setLoading(true); // Start loading
      const characterData = await fetchCharacterDetail(id); // Fetch character details
      setCharacter(characterData); // Update state with fetched data
      setLoading(false); // Stop loading
    };

    loadCharacter(); // Trigger data loading
  }, [id, fetchCharacterDetail]); // Dependencies: ID and Zustand function

  if (loading) return <p>Loading...</p>; // Show loading message
  if (!character) return <p>Character not found.</p>; // Handle no character found

  return (
    <div className="character-detail">
      {/* Character image */}
      <img
        src={character.image || "/default-image.jpg"}
        alt={character.name}
        className="character-image"
        onError={(e) => {
          e.target.src = "/default-image.jpg"; 
        }}
      />

      <div className="character-info">
        <h1>
          {character.name}
          <div className="character-element">
            {character.element ? (
              <img
                src={character.element} 
                alt={`${character.name} element`}
                className="element-image"
                onError={(e) => {
                  e.target.src = "/default-element.png"; 
                }}
              />
            ) : (
              <p>No element available</p>
            )}
          </div>
        </h1>
        <p className="description"><strong>dercription:</strong> {character.description}</p>
      </div>
    </div>
  );
};

export default CharacterDetail;
