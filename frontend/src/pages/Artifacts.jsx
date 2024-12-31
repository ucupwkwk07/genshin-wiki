import React, { useEffect, useState } from "react";
import axios from "axios"; 
import { Link } from "react-router-dom";
import "./Artifacts.css";

const Artifacts = () => {
  const [artifacts, setArtifacts] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); 
  const [artifactToUpdate, setArtifactToUpdate] = useState(null); 
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    rarity: "",
    bonus2: "",
    bonus4: "",
  });
  const [notification, setNotification] = useState(null); 
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 
  const [artifactToDelete, setArtifactToDelete] = useState(null); 

  const API_URL = "/api/artifacts"; 

  useEffect(() => {
    const fetchArtifacts = async () => {
      try {
        const response = await axios.get(API_URL);
        if (response.data.success) {
          setArtifacts(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching artifacts:", error.message);
      }
    };
    fetchArtifacts();
  }, []);

  const openDeleteModal = (artifactId) => {
    setArtifactToDelete(artifactId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setArtifactToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const confirmDelete = async () => {
    if (artifactToDelete) {
      try {
        const response = await axios.delete(`${API_URL}/${artifactToDelete}`);
        if (response.data.success) {
          setNotification(response.data.message);
          setArtifacts(artifacts.filter((artifact) => artifact._id !== artifactToDelete));
          setTimeout(() => setNotification(null), 2000); 
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error("Error deleting artifact:", error.message);
      }
      closeDeleteModal();
    }
  };

  const handleOpenUpdateModal = (artifact) => {
    setArtifactToUpdate(artifact); 
    setFormData({
      image: "",
      name: artifact.name,
      rarity: artifact.rarity,
      bonus2: artifact.bonus2,
      bonus4: artifact.bonus4,
    }); 
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setArtifactToUpdate(null);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (artifactToUpdate) {
      const formDataWithImage = new FormData();
      formDataWithImage.append("image", formData.image);
      formDataWithImage.append("name", formData.name);
      formDataWithImage.append("rarity", formData.rarity);
      formDataWithImage.append("bonus2", formData.bonus2);
      formDataWithImage.append("bonus4", formData.bonus4);

      try {
        const response = await axios.put(
          `${API_URL}/${artifactToUpdate._id}`,
          formDataWithImage,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (response.data.success) {
          setNotification(response.data.message);
          setTimeout(() => setNotification(null), 2000); 

          
          const updatedArtifactsResponse = await axios.get(API_URL);
          if (updatedArtifactsResponse.data.success) {
            setArtifacts(updatedArtifactsResponse.data.data);
          }

          handleCloseUpdateModal();
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error("Error updating artifact:", error.message);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="artifacts-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/artifacts/create">
            <button className="artifact-button">Add Artifact</button>
          </Link>
        </div>
        <div className="navbar-center">
          <h1 className="navbar-title">Artifact List</h1>
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
      <div className="artifacts-container">
        {artifacts.length > 0 ? (
          <table className="artifacts-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Rarity</th>
                <th>Bonus 2</th>
                <th>Bonus 4</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {artifacts.map((artifact) => (
                <tr key={artifact._id}>
                  <td>
                    <img
                      src={artifact.image}
                      className="artifact-image"
                      alt={artifact.name}
                    />
                  </td>
                  <td>
                    <Link
                      to={`/artifacts/${artifact._id}`}
                      className="artifact-link"
                    >
                      {artifact.name}
                    </Link>
                  </td>
                  <td>
                    <img
                      src={artifact.rarity}
                      className="rarity-image"
                      alt="Rarity"
                    />
                  </td>
                  <td>{artifact.bonus2}</td>
                  <td>{artifact.bonus4}</td>
                  <td>
                    <button
                      className="update-button"
                      onClick={() => handleOpenUpdateModal(artifact)}
                    >
                      Update
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => openDeleteModal(artifact._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-artifacts-message">No artifacts available</p>
        )}
      </div>

      {/* Update Modal */}
      {isUpdateModalOpen && (
        <div className="update-modal">
          <div className="modal-content">
            <h2>Update Artifact</h2>
            <form onSubmit={handleUpdateSubmit}>
              <label>
                Image:
                <input
                  type="file"
                  name="image"
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
                Bonus 2:
                <textarea
                  name="bonus2"
                  value={formData.bonus2}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </label>
              <label>
                Bonus 4:
                <textarea
                  name="bonus4"
                  value={formData.bonus4}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </label>
              <div className="modal-buttons">
                <button type="submit" className="modal-submit-button">
                  Save
                </button>
                <button
                  type="button"
                  className="modal-cancel-button"
                  onClick={handleCloseUpdateModal}
                >
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
            <p>Are you sure you want to delete this artifact?</p>
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

export default Artifacts;
