import React, { useState } from "react";
import { useWeaponStore } from "../store/weapon";
import { useNavigate } from "react-router-dom"; // Import navigation hook
import "./CreateWeapon.css";

const CreateWeapon = () => {
  const [newWeapon, setNewWeapon] = useState({
    image: "",
    name: "",
    type: "",
    rarity: "",
    description: "",
  });

  const { CreateWeapon } = useWeaponStore();
  const navigate = useNavigate(); // For navigating to the weapon page
  const [notification, setNotification] = useState(null); // For success notification

  const handleAddWeapon = async (e) => {
    e.preventDefault(); // Prevent form reload

    if (
      !newWeapon.image ||
      !newWeapon.name ||
      !newWeapon.type ||
      !newWeapon.rarity ||
      !newWeapon.description
    ) {
      console.error("All fields are required.");
      return;
    }

    try {
      const { success, message } = await CreateWeapon(newWeapon);
      if (success) {
        setNotification("Weapon created successfully!");
        setTimeout(() => {
          navigate("/weapons"); // Redirect to the weapon page after 2 seconds
        }, 2000); // Notification display duration
      } else {
        console.error(message);
      }
    } catch (error) {
      console.error("Failed to create weapon:", error);
    }
  };

  return (
    <div className="create-weapon-container">
      <h1>Create Weapon</h1>

      {/* Notification */}
      {notification && <div className="notification">{notification}</div>}

      <form className="create-weapon-form">
        <div className="form-group">
          <label htmlFor="image">Weapon Image</label>
          <input
            placeholder="Image URL"
            name="image"
            value={newWeapon.image}
            onChange={(e) =>
              setNewWeapon({ ...newWeapon, image: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Weapon Name</label>
          <input
            placeholder="Name"
            name="name"
            value={newWeapon.name}
            onChange={(e) =>
              setNewWeapon({ ...newWeapon, name: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <input
            placeholder="Type"
            name="type"
            value={newWeapon.type}
            onChange={(e) =>
              setNewWeapon({ ...newWeapon, type: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="rarity">Rarity</label>
          <input
            placeholder="Rarity"
            name="rarity"
            value={newWeapon.rarity}
            onChange={(e) =>
              setNewWeapon({ ...newWeapon, rarity: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            placeholder="Description"
            name="description"
            value={newWeapon.description}
            onChange={(e) =>
              setNewWeapon({ ...newWeapon, description: e.target.value })
            }
          ></textarea>
        </div>
        <button onClick={handleAddWeapon}>Add Weapon</button>
      </form>
    </div>
  );
};

export default CreateWeapon;
