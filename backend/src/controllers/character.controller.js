import mongoose from "mongoose";
import Character from "../models/character.model.js";

export const createCharacter = async (req, res) => {
    const character = req.body;

    if (!character.image || !character.name || !character.element || !character.description) {
        return res.status(400).json({ success: false, message: "Please provide all fields." });
    }

    const newCharacter = new Character(character);

    try {
        await newCharacter.save();
        res.status(201).json({ success: true, data: newCharacter });
    } catch (error) {
        console.error("Error creating new character:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const deleteCharacter = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid character ID" });
    }

    try {
        await Character.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Character deleted" });
    } catch (error) {
        console.log("Error in deleting character:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const getCharacters = async (req, res) => {
    try {
        const characters = await Character.find({});
        res.status(200).json({ success: true, data: characters });
    } catch (error) {
        console.log("Error in fetching characters:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const updateCharacter = async (req, res) => {
    const { id } = req.params;
    const character = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid character ID" });
    }

    try {
        const updatedCharacter = await Character.findByIdAndUpdate(id, character, { new: true });
        res.status(200).json({ success: true, data: updatedCharacter });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const getCharacterById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid character ID" });
    }

    try {
        const character = await Character.findById(id);

        if (!character) {
            return res.status(404).json({ success: false, message: "Character not found" });
        }

        res.status(200).json({ success: true, data: character });
    } catch (error) {
        console.log("Error in fetching character by ID:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


