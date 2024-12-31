import React, { useEffect, useState } from "react";
import { useWeaponStore } from "../store/weapon";
import "./Weapons.css";
import { Link } from "react-router-dom";

const Weapons = () => {
  const { weapons, getWeapons, deleteWeapon, updateWeapon } = useWeaponStore();

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // Controls update modal visibility
  const [weaponToUpdate, setWeaponToUpdate] = useState(null); // Stores the weapon being edited
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    type: "",
    rarity: "",
    description: "",
  });
  const [notification, setNotification] = useState(null); // Notification state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Controls delete modal visibility
  const [weaponToDelete, setWeaponToDelete] = useState(null); // Stores the weapon to delete

  useEffect(() => {
    const fetchWeapons = async () => {
      await getWeapons();
    };
    fetchWeapons();
  }, [getWeapons]);

  const openDeleteModal = (weaponId) => {
    setWeaponToDelete(weaponId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setWeaponToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const confirmDelete = async () => {
    if (weaponToDelete) {
      const result = await deleteWeapon(weaponToDelete);
      if (result.success) {
        setNotification(result.message);
        setTimeout(() => setNotification(null), 2000); // Clear notification after 2 seconds
      } else {
        alert(result.message);
      }
      closeDeleteModal(); // Close modal after action
    }
  };

  const handleOpenUpdateModal = (weapon) => {
    setWeaponToUpdate(weapon); // Set the current weapon for updating
    setFormData({
      image: weapon.image,
      name: weapon.name,
      type: weapon.type,
      rarity: weapon.rarity,
      description: weapon.description,
    }); // Pre-fill form data with the weapon's current data
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setWeaponToUpdate(null);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    if (weaponToUpdate) {
      const result = await updateWeapon(weaponToUpdate._id, formData); // Call Zustand's updateWeapon
      if (result.success) {
        setNotification(result.message);
        setTimeout(() => setNotification(null), 2000); // Clear notification after 2 seconds
        handleCloseUpdateModal();
      } else {
        alert(result.message);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="weapons-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/weapons/create">
            <button className="weapon-button">Add Weapon</button>
          </Link>
        </div>
        <div className="navbar-center">
          <h1 className="navbar-title">Weapon List</h1>
        </div>
        <div className="navbar-right"></div>
      </nav>

      {/* Notification */}
      {notification && (
        <div className="notification">
          <p>{notification}</p>
        </div>
      )}

      {/* Main Content */}
      <div className="weapons-container">
        {weapons.length > 0 ? (
          <table className="weapons-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Type</th>
                <th>Rarity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {weapons.map((weapon) => (
                <tr key={weapon._id}>
                  <td>
                    <img src={weapon.image} className="weapon-image" alt={weapon.name} />
                  </td>
                  <td>
                    <Link to={`/weapons/${weapon._id}`} className="weapon-link">
                      {weapon.name}
                    </Link>
                  </td>
                  <td>
                    <img src={weapon.type} alt="Type" />
                  </td>
                  <td>
                    <img src={weapon.rarity} className="rarity-image" alt="Rarity" />
                  </td>
                  <td>
                    <button
                      className="update-button"
                      onClick={() => handleOpenUpdateModal(weapon)}
                    >
                      Update
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => openDeleteModal(weapon._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-weapons-message">No weapons available</p>
        )}
      </div>

      {/* Update Modal */}
      {isUpdateModalOpen && (
        <div className="update-modal">
          <div className="modal-content">
            <h2>Update Weapon</h2>
            <form onSubmit={handleUpdateSubmit}>
              <label>
                Image URL:
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Type:
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Rarity:
                <input
                  type="text"
                  name="rarity"
                  value={formData.rarity}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Description:
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </label>
              <div className="modal-buttons">
                <button type="submit" className="modal-submit-button">Save</button>
                <button type="button" className="modal-cancel-button" onClick={handleCloseUpdateModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this weapon?</p>
            <div className="modal-buttons">
              <button className="modal-submit-button" onClick={confirmDelete}>
                Yes, Delete
              </button>
              <button className="modal-cancel-button" onClick={closeDeleteModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weapons;
