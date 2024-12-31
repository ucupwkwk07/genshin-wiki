import { create } from "zustand";

export const useArtifactStore = create((set) => ({
  artifacts: [],
  setArtifacts: (artifacts) => set({ artifacts }),

  CreateArtifact: async (newArtifact) => {
    // Validation check for missing fields
    if (!newArtifact.image || !newArtifact.name || !newArtifact.rarity || !newArtifact.bonus2 || !newArtifact.bonus4) {
      return { success: false, message: "Please fill in all fields." };
    }

    try {
      // Send POST request to create a new artifact
      const res = await fetch("/api/artifacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newArtifact),
      });

      // Handle failed request response
      if (!res.ok) {
        const errorData = await res.json();
        return { success: false, message: errorData.message || "Failed to create artifact." };
      }

      // Successfully created artifact, update the store state
      const data = await res.json();
      set((state) => ({ artifacts: [...state.artifacts, data.data] }));

      return { success: true, message: "Artifact created successfully." };
    } catch (error) {
      console.error("Error creating artifact:", error);
      return { success: false, message: "Network error occurred." };
    }
  },

  getArtifacts: async () => {
    try {
      const res = await fetch("/api/artifacts");

      if (!res.ok) {
        const errorData = await res.json();
        return { success: false, message: errorData.message || "Failed to fetch artifacts." };
      }

      const data = await res.json();
      set({ artifacts: data.data });
      return { success: true };
    } catch (error) {
      console.error("Error fetching artifacts:", error);
      return { success: false, message: "Network error occurred." };
    }
  },

  deleteArtifact: async (id) => {
    try {
      const res = await fetch(`/api/artifacts/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        return { success: false, message: errorData.message || "Failed to delete artifact." };
      }

      set((state) => ({
        artifacts: state.artifacts.filter((artifact) => artifact._id !== id),
      }));
      return { success: true, message: "Artifact deleted successfully." };
    } catch (error) {
      console.error("Error deleting artifact:", error);
      return { success: false, message: "Network error occurred." };
    }
  },

  updateArtifact: async (id, updatedArtifact) => {
    try {
      const res = await fetch(`/api/artifacts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedArtifact),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return { success: false, message: errorData.message || "Failed to update artifact." };
      }

      const data = await res.json();
      set((state) => ({
        artifacts: state.artifacts.map((artifact) =>
          artifact._id === id ? data.data : artifact
        ),
      }));
      return { success: true, message: "Artifact updated successfully." };
    } catch (error) {
      console.error("Error updating artifact:", error);
      return { success: false, message: "Network error occurred." };
    }
  },

  getArtifactById: async (id) => {
    try {
      const res = await fetch(`/api/artifacts/${id}`);

      if (!res.ok) {
        const errorData = await res.json();
        return { success: false, message: errorData.message || "Failed to fetch artifact." };
      }

      const data = await res.json();
      return { success: true, data: data.data };
    } catch (error) {
      console.error("Error fetching artifact by ID:", error);
      return { success: false, message: "Network error occurred." };
    }
  },
}));
