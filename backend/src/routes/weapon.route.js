import express from "express";
import { createWeapon, deleteWeapon, getWeapons, updateWeapon, getWeaponById } from "../controllers/weapon.controller.js";

const router = express.Router();

router.get("/", getWeapons);
router.post("/", createWeapon);
router.put("/:id", updateWeapon);
router.delete("/:id", deleteWeapon);
router.get("/:id", getWeaponById);

export default router;