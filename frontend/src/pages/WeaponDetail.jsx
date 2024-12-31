import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./WeaponDetail.css";

const WeaponDetail = () => {
  const { id } = useParams();
  const [weapon, setWeapon] = useState(null);

  useEffect(() => {
    const fetchWeapon = async () => {
      try {
        const res = await fetch(`/api/weapons/${id}`);
        const data = await res.json();
        setWeapon(data.data);
      } catch (error) {
        console.error("Error fetching weapon:", error);
      }
    };
    fetchWeapon();
  }, [id]);

  return (
    <div className="weapon-detail">
      {weapon ? (
        <>
          <div className="weapon-image-container">
            <img
              src={weapon.image}
              alt={weapon.name}
              className="weapon-image"
            />
          </div>
          <div className="weapon-info">
            <h1>
              {weapon.name}
              <span className="weapon-type">
                <img src={weapon.type} alt="Type" />
              </span>
              <span className="weapon-rarity">
                <img src={weapon.rarity} alt="Rarity" />
              </span>
            </h1>
            <p className="description"><strong>description:</strong>{weapon.description}</p>
          </div>
        </>
      ) : (
        <p className="loading-message">Loading weapon details...</p>
      )}
    </div>
  );
};

export default WeaponDetail;
