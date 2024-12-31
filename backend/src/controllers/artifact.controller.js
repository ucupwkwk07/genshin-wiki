import mongoose from "mongoose";
import Artifact from "../models/artifact.model.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const uploadImage = upload.single("image");

export const createArtifact = async (req, res) => {
    const { name, rarity, bonus2, bonus4 } = req.body;

    if (!req.file || !name || !rarity || !bonus2 || !bonus4) {
        return res.status(400).json({ success: false, message: "Please provide all fields and an image file" });
    }

    const newArtifact = new Artifact({
        image: req.file.buffer, 
        name,
        rarity,
        bonus2,
        bonus4,
    });

    try {
        await newArtifact.save();
        res.status(201).json({ success: true, data: newArtifact });
    } catch (error) {
        console.error("Error creating new artifact:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const deleteArtifact = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid artifact ID" });
    }

    try {
        await Artifact.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Artifact deleted" });
    } catch (error) {
        console.error("Error in deleting artifact:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const getArtifacts = async (req, res) => {
    try {
        const artifacts = await Artifact.find({});

        const artifactsWithImages = artifacts.map((artifact) => ({
            ...artifact.toObject(),
            image: `data:image/jpeg;base64,${artifact.image.toString("base64")}`,
        }));

        res.status(200).json({ success: true, data: artifactsWithImages });
    } catch (error) {
        console.error("Error in fetching artifacts:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const updateArtifact = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid artifact ID" });
    }

    try {
        const updatedData = req.body;

        if (req.file) {
            updatedData.image = req.file.buffer;
        }

        const updatedArtifact = await Artifact.findByIdAndUpdate(id, updatedData, { new: true });
        res.status(200).json({ success: true, data: updatedArtifact, message: "Artifact Update Successful" });
    } catch (error) {
        console.error("Error updating artifact:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const getArtifactById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid artifact ID" });
    }

    try {
        const artifact = await Artifact.findById(id);

        if (!artifact) {
            return res.status(404).json({ success: false, message: "Artifact not found" });
        }

        const artifactWithImage = {
            ...artifact.toObject(),
            image: `data:image/jpeg;base64,${artifact.image.toString("base64")}`,
        };

        res.status(200).json({ success: true, data: artifactWithImage });
    } catch (error) {
        console.error("Error in fetching artifact by ID:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
