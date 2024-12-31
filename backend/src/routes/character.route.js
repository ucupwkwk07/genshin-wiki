import express from "express";
import { createCharacter, deleteCharacter, getCharacters, updateCharacter, getCharacterById } from "../controllers/character.controller.js";

const router = express.Router();

router.get("/", getCharacters);
router.post("/", createCharacter);
router.put("/:id", updateCharacter);
router.delete("/:id", deleteCharacter);
router.get("/:id", getCharacterById);

export default router;