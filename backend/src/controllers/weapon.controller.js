import mongoose from "mongoose";
import Weapon from "../models/weapon.model.js";

export const createWeapon = async (req, res) => {
    const weapon = req.body;
 
    if(!weapon.image || !weapon.name || !weapon.type || !weapon.rarity || !weapon.description) {
       return res.status(400).json({ success:false, message: "please provide all field" });
    }
 
    const newWeapon = new Weapon(weapon)
 
    try {
       await newWeapon.save();
       res.status(201).json({ success: true, data: newWeapon});
    } catch (error) {
       console.error("error creating new weapon:", error.message);
       res.status(500).json({success: false, message:"server eror"})
    }
 };

 export const deleteWeapon = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid weapon Id" });
	}

	try {
		await Weapon.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "weapon deleted" });
	} catch (error) {
		console.log("error in deleting weapon:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const getWeapons = async (req, res) => {
	try {
		const weapons = await Weapon.find({});
		res.status(200).json({ success: true, data: weapons });
	} catch (error) {
		console.log("error in fetching weapon:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const updateWeapon = async (req, res) => {
	const { id } = req.params;

	const weapon = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid weapon Id" });
	}

	try {
		const updatedWeapon = await Weapon.findByIdAndUpdate(id, weapon, { new: true });
		res.status(200).json({ success: true, data: updatedWeapon });
	} catch (error) {
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const getWeaponById = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid weapon Id" });
	}

	try {
		const weapon = await Weapon.findById(id);
		if (!weapon) {
			return res.status(404).json({ success: false, message: "Weapon not found" });
		}
		res.status(200).json({ success: true, data: weapon });
	} catch (error) {
		console.log("error in fetching weapon by ID:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};