import mongoose from 'mongoose';

const weaponSchema = new mongoose.Schema(
    {
        image:{
            type: String,
            required: true,
        },

        name:{
            type: String,
            required: true,
        },

        type:{
            type: String,
            required: true,
        },

        rarity:{
            type: String,
            required: true,
        },

        description:{
            type: String,
            required: true,
        },
    }, 
    {
        timestamps: true,
    }
);

const Weapon = mongoose.model('Weapon', weaponSchema);

export default Weapon;