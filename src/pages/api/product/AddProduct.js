import Product from "@/Schemas/server/ProductSchema";
import connectDB from "@/database/db";
export default async function handler(req, res) {
  await connectDB();

  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" }).end();
  }
  try {
    const {
      title,
      description,
      price,
      discountPercentage,
      rating,
      stock,
      brand,
      category,
      thumbnail,
      images,
      reviews,
    } = req.body;
    const newProduct = new Product({
      title,
      description,
      price,
      discountPercentage,
      rating,
      stock,
      brand,
      category,
      thumbnail,
      images,
      reviews,
    });
    const savedProduct = await newProduct.save();
    res
      .status(201)
      .json({ message: "Product created successfully", data: savedProduct })
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal server error" })
  }
}
