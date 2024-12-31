import mongoose from 'mongoose';

const characterSchema = new mongoose.Schema(
    {
        image:{
            type: String,
            required: true,
        },

        name:{
            type: String,
            required: true,
        },

        element:{
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

const Character = mongoose.model('Character', characterSchema);

export default Character;