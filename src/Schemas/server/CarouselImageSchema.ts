import mongoose from "mongoose";

const CarouselImageSchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
  },
  { versionKey: false }
);

const CarouselImage =
  mongoose.models.CarouselImage ||
  mongoose.model("CarouselImage", CarouselImageSchema);

export default CarouselImage;
