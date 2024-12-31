import { create } from "zustand";

export const useWeaponStore = create((set) => ({
  weapons: [],
  setWeapons: (weapons) => set({ weapons }),

  CreateWeapon: async (newWeapon) => {
    if (!newWeapon.image || !newWeapon.name || !newWeapon.type || !newWeapon.rarity || !newWeapon.description) {
      return { success: false, message: "Please fill in all fields." };
    }

    try {
      const res = await fetch("/api/weapons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newWeapon),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return { success: false, message: errorData.message || "Failed to create weapon." };
      }

      const data = await res.json();
      set((state) => ({ weapons: [...state.weapons, data.data] }));
      return { success: true, message: "Weapon created successfully." };
    } catch (error) {
      console.error("Error creating weapon:", error);
      return { success: false, message: "Network error occurred." };
    }
  },

  getWeapons: async () => {
    try {
      const res = await fetch("/api/weapons");

      if (!res.ok) {
        const errorData = await res.json();
        return { success: false, message: errorData.message || "Failed to fetch weapons." };
      }

      const data = await res.json();
      set({ weapons: data.data });
      return { success: true };
    } catch (error) {
      console.error("Error fetching weapons:", error);
      return { success: false, message: "Network error occurred." };
    }
  },

  deleteWeapon: async (id) => {
    try {
      const res = await fetch(`/api/weapons/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        return { success: false, message: errorData.message || "Failed to delete weapon." };
      }

      set((state) => ({
        weapons: state.weapons.filter((weapon) => weapon._id !== id),
      }));
      return { success: true, message: "Weapon deleted successfully." };
    } catch (error) {
      console.error("Error deleting weapon:", error);
      return { success: false, message: "Network error occurred." };
    }
  },

  updateWeapon: async (id, updatedWeapon) => {
    try {
      const res = await fetch(`/api/weapons/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedWeapon),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return { success: false, message: errorData.message || "Failed to update weapon." };
      }

      const data = await res.json();
      set((state) => ({
        weapons: state.weapons.map((weapon) =>
          weapon._id === id ? data.data : weapon
        ),
      }));
      return { success: true, message: "Weapon updated successfully." };
    } catch (error) {
      console.error("Error updating weapon:", error);
      return { success: false, message: "Network error occurred." };
    }
  },

  getWeaponById: async (id) => {
    try {
      const res = await fetch(`/api/weapons/${id}`);

      if (!res.ok) {
        const errorData = await res.json();
        return { success: false, message: errorData.message || "Failed to fetch weapon." };
      }

      const data = await res.json();
      return { success: true, data: data.data };
    } catch (error) {
      console.error("Error fetching weapon by ID:", error);
      return { success: false, message: "Network error occurred." };
    }
  },
}));
