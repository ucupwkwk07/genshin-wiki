import express from "express";
import {
    createArtifact,
    deleteArtifact,
    getArtifacts,
    updateArtifact,
    getArtifactById,
    uploadImage,
} from "../controllers/artifact.controller.js";

const router = express.Router();

router.get("/", getArtifacts);
router.get("/:id", getArtifactById);
router.post("/", uploadImage, createArtifact); 
router.put("/:id", uploadImage, updateArtifact); 
router.delete("/:id", deleteArtifact);


export default router;
