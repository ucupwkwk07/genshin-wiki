import mongoose from 'mongoose';

const artifactSchema = new mongoose.Schema(
    {
        image: {
            type: Buffer, // To store binary image data
            required: true,
        },

        name: {
            type: String,
            required: true,
        },

        rarity: {
            type: String,
            required: true,
        },

        bonus2: {
            type: String,
            required: true,
        },

        bonus4: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Artifact = mongoose.model('Artifact', artifactSchema);

export default Artifact;
