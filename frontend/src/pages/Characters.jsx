import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useCharacterStore } from "../store/character";
import { Link } from "react-router-dom";
import "./Characters.css";

const Characters = () => {
  const { fetchCharacters, characters, deleteCharacter, updateCharacter } = useCharacterStore();
  const [showModal, setShowModal] = useState(false);
  const [editingCharacter, setEditingCharacter] = useState(null);
  const [updatedCharacter, setUpdatedCharacter] = useState({
    image: "",
    name: "",
    element: "",
    description: "",
  });
  const [notification, setNotification] = useState(""); // Notification state
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Delete modal state
  const [characterToDelete, setCharacterToDelete] = useState(null); // Character to delete

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  const handleDelete = async () => {
    if (characterToDelete) {
      const result = await deleteCharacter(characterToDelete);
      if (result.success) {
        showNotification("Character deleted successfully!");
      } else {
        showNotification("Failed to delete character.");
      }
      setShowDeleteModal(false); // Close modal after deletion
      setCharacterToDelete(null); // Reset character to delete
    }
  };

  const handleUpdateClick = (character) => {
    setEditingCharacter(character);
    setUpdatedCharacter({
      image: character.image || "",
      name: character.name || "",
      element: character.element || "",
      description: character.description || "",
    });
    setShowModal(true);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCharacter((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const result = await updateCharacter(editingCharacter._id, updatedCharacter);
    if (result.success) {
      showNotification("Character updated successfully!");
      setShowModal(false); // Close modal after success
    } else {
      showNotification("Failed to update character.");
    }
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification("");
    }, 2000); // Timer for 2 seconds
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-center">Characters List </div>
        <div className="navbar-right">
          <Link to="/characters/create">
            <button className="add-character-button">Add character</button>
          </Link>
        </div>
      </nav>

      {/* Notification */}
      {notification && (
        <div
          className={`notification ${
            notification.includes("successfully") ? "success" : "error"
          }`}
        >
          {notification}
        </div>
      )}

      {/* Character List */}
      <div className="character-container">
        <div className="character-grid">
          {characters.map((character) => (
            <div key={character._id} className="character-card">
              <img
                src={character.image || "/default-image.jpg"}
                alt={character.name}
                className="character-image"
                onError={(e) => {
                  e.target.src = "/default-image.jpg";
                }}
              />
              <div className="character-details">
                <h3 className="character-name">
                  <Link to={`/characters/${character._id}`}>{character.name}</Link>
                </h3>
              </div>
              <div className="character-actions">
                <button
                  className="icon-button"
                  onClick={() => handleUpdateClick(character)}
                >
                  <FaEdit />
                </button>
                <button
                  className="icon-button"
                  onClick={() => {
                    setCharacterToDelete(character._id);
                    setShowDeleteModal(true); // Open delete modal
                  }}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        {characters.length === 0 && (
          <div className="no-characters">No characters found 😢</div>
        )}
      </div>

      {/* Update Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Character</h2>
            <form onSubmit={handleUpdateSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={updatedCharacter.name}
                  onChange={handleUpdateChange}
                />
              </label>
              <label>
                Image URL:
                <input
                  type="text"
                  name="image"
                  value={updatedCharacter.image}
                  onChange={handleUpdateChange}
                />
              </label>
              <label>
                Element:
                <input
                  type="text"
                  name="element"
                  value={updatedCharacter.element}
                  onChange={handleUpdateChange}
                />
              </label>
              <label>
                Description:
                <textarea
                  name="description"
                  value={updatedCharacter.description}
                  onChange={handleUpdateChange}
                />
              </label>
              <div className="modal-actions">
                <button type="submit">Save Changes</button>
                <button type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this character?</p>
            <div className="modal-actions">
              <button onClick={handleDelete}>Yes, Delete</button>
              <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Characters;
