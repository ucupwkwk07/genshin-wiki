import React, { useState } from "react";
import axios from "axios"; 
import { useNavigate } from "react-router-dom"; 
import "./CreateArtifact.css";

const CreateArtifact = () => {
  const [newArtifact, setNewArtifact] = useState({
    image: null,
    name: "",
    rarity: "",
    bonus2: "",
    bonus4: "",
  });

  const [notification, setNotification] = useState(null); 
  const navigate = useNavigate(); 

  const API_URL = "/api/artifacts"; 

  const handleAddArtifact = async (e) => {
    e.preventDefault(); 

    // Check if all fields are filled
    if (
      !newArtifact.image ||
      !newArtifact.name ||
      !newArtifact.rarity ||
      !newArtifact.bonus2 ||
      !newArtifact.bonus4
    ) {
      setNotification("All fields are required."); 
      setTimeout(() => setNotification(null), 2000); 
      return;
    }

    const formData = new FormData();
    formData.append("image", newArtifact.image);
    formData.append("name", newArtifact.name);
    formData.append("rarity", newArtifact.rarity);
    formData.append("bonus2", newArtifact.bonus2);
    formData.append("bonus4", newArtifact.bonus4);

    try {
      const response = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        setNotification("Artifact created successfully!"); 
        setTimeout(() => {
          setNotification(null);
          navigate("/artifacts"); 
        }, 2000);
      } else {
        setNotification("Failed to create artifact: " + response.data.message); 
        setTimeout(() => setNotification(null), 2000);
      }
    } catch (error) {
      console.error("Error creating artifact:", error.message);
      setNotification("An error occurred while creating the artifact."); 
      setTimeout(() => setNotification(null), 2000);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setNewArtifact({ ...newArtifact, [name]: files[0] });
    } else {
      setNewArtifact({ ...newArtifact, [name]: value });
    }
  };

  return (
    <div className="create-artifact-container">
      <h1>Create Artifact</h1>

      {/* Notification */}
      {notification && (
        <div className="notification">
          <p>{notification}</p>
        </div>
      )}

      <form className="create-artifact-form" onSubmit={handleAddArtifact}>
        <div className="form-group">
          <label htmlFor="image">Artifact Image</label>
          <input
            type="file"
            name="image"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Artifact Name</label>
          <input
            type="text"
            name="name"
            value={newArtifact.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rarity">Rarity</label>
          <input
            type="text"
            name="rarity"
            value={newArtifact.rarity}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="bonus2">Bonus 2</label>
          <textarea
            name="bonus2"
            value={newArtifact.bonus2}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="bonus4">Bonus 4</label>
          <textarea
            name="bonus4"
            value={newArtifact.bonus4}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <button type="submit">Add Artifact</button>
      </form>
    </div>
  );
};

export default CreateArtifact;
