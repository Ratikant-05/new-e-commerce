import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type: String, required: true },
        stock: { type: Number, required: true, default: 0 },
        image: { type: String, required: true }, // Image URL (Cloudinary/AWS S3)
        ratings: {
            type: Number,
            default: 0,
        },
        reviews: [
            {
                user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                rating: { type: Number, required: true },
                comment: { type: String },
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.model("Product", productSchema);
