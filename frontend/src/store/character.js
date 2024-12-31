import { create } from "zustand";

export const useCharacterStore = create((set) => ({
  characters: [],
  setCharacters: (characters) => set({ characters }),

  fetchCharacters: async () => {
    const res = await fetch("/api/characters");
    const data = await res.json();
    set({ characters: data.data });
  },

  createCharacter: async (newCharacter) => {
    if (!newCharacter.image || !newCharacter.name || !newCharacter.element || !newCharacter.description) {
      return { success: false, message: "Please fill in all fields." };
    }

    try {
      const res = await fetch("/api/characters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCharacter),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return { success: false, message: errorData.message || "Failed to create character." };
      }

      const data = await res.json();
      set((state) => ({ characters: [...state.characters, data.data] }));
      return { success: true, message: "Character created successfully." };
    } catch (error) {
      console.error("Error creating character:", error);
      return { success: false, message: "Network error occurred." };
    }
  },

  fetchCharacterDetail: async (id) => {
    try {
      const res = await fetch(`/api/characters/${id}`);
      const data = await res.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching character detail:", error);
      return null;
    }
  },

  deleteCharacter: async (id) => {
    try {
      const res = await fetch(`/api/characters/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        return { success: false, message: errorData.message || "Failed to delete character." };
      }

      set((state) => ({
        characters: state.characters.filter((character) => character._id !== id),
      }));

      return { success: true, message: "Character deleted successfully." };
    } catch (error) {
      console.error("Error deleting character:", error);
      return { success: false, message: "Network error occurred." };
    }
  },

  updateCharacter: async (id, updatedCharacter) => {
    try {
      const res = await fetch(`/api/characters/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCharacter),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return { success: false, message: errorData.message || "Failed to update character." };
      }

      const data = await res.json();
      set((state) => ({
        characters: state.characters.map((character) =>
          character._id === id ? data.data : character
        ),
      }));

      return { success: true, message: "Character updated successfully." };
    } catch (error) {
      console.error("Error updating character:", error);
      return { success: false, message: "Network error occurred." };
    }
  },
}));
