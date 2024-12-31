import React, { useState } from "react";
import { useCharacterStore } from "../store/character";
import { useNavigate } from "react-router-dom"; // Import navigation hook
import "./CreateCharacter.css";

const CreateCharacter = () => {
  const [newCharacter, setNewCharacter] = useState({
    image: "",
    name: "",
    element: "",
    description: "",
  });

  const { createCharacter } = useCharacterStore();
  const navigate = useNavigate(); // For navigating to the character page
  const [notification, setNotification] = useState(null); // For success notification

  const handleAddCharacter = async (e) => {
    e.preventDefault(); // Prevent form reload

    if (
      !newCharacter.image ||
      !newCharacter.name ||
      !newCharacter.element ||
      !newCharacter.description
    ) {
      console.error("All fields are required.");
      return;
    }

    try {
      const { success, message } = await createCharacter(newCharacter);
      if (success) {
        setNotification("Character created successfully!");
        setTimeout(() => {
          navigate("/characters"); // Redirect to the character page after 2 seconds
        }, 2000); // Notification display duration
      } else {
        console.error(message);
      }
    } catch (error) {
      console.error("Failed to create character:", error);
    }
  };

  return (
    <div className="create-character-container">
      <h1>Create Character</h1>

      {/* Notification */}
      {notification && <div className="notification">{notification}</div>}

      <form className="create-character-form">
        <div className="form-group">
          <label htmlFor="image">Character Image</label>
          <input
            placeholder="Image URL"
            name="image"
            value={newCharacter.image}
            onChange={(e) =>
              setNewCharacter({ ...newCharacter, image: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Character Name</label>
          <input
            placeholder="Name"
            name="name"
            value={newCharacter.name}
            onChange={(e) =>
              setNewCharacter({ ...newCharacter, name: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="element">Element</label>
          <input
            placeholder="Element"
            name="element"
            value={newCharacter.element}
            onChange={(e) =>
              setNewCharacter({ ...newCharacter, element: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            placeholder="Description"
            name="description"
            value={newCharacter.description}
            onChange={(e) =>
              setNewCharacter({ ...newCharacter, description: e.target.value })
            }
          ></textarea>
        </div>
        <button onClick={handleAddCharacter}>Add Character</button>
      </form>
    </div>
  );
};

export default CreateCharacter;
