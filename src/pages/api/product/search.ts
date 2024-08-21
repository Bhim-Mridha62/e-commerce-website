// import Product from "@/Schemas/server/ProductSchema";
// import connectDB from "@/database/db";
// import { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   await connectDB();
//   if (req.method !== "GET") {
//     res.status(405).json({ message: "Method Not Allowed" });
//   } else {
//     try {
//       const { q } = req.query;
//       if (!q) {
//         return res
//           .status(400)
//           .json({ message: "Bad Request: Missing or invalid query" });
//       }
//       // const value = "shirt Sleeve";

//       const words = q.split(" ");
//       const products = await Product.aggregate([
//         {
//           $match: {
//             $or: [
//               { title: { $regex: words.join("|"), $options: "i" } },
//               { brand: { $regex: words.join("|"), $options: "i" } },
//               { category: { $regex: words.join("|"), $options: "i" } },
//             ],
//           },
//         },
//         {
//           $addFields: {
//             exactMatch: {
//               $cond: [
//                 {
//                   $or: [
//                     { $eq: ["$title", q] },
//                     { $eq: ["$brand", q] },
//                     { $eq: ["$category", q] },
//                   ],
//                 },
//                 1,
//                 0,
//               ],
//             },
//           },
//         },
//         { $sort: { exactMatch: -1 } },
//         {
//           $project: {
//             title: 1,
//             thumbnail: 1,
//             price: 1,
//             rating: 1,
//             discountPercentage: 1,
//             brand: 1,
//             category: 1,
//           },
//         },
//       ]);
//       res.status(200).json({ data: products, q: q });
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   }
// }
import Product from "@/Schemas/server/ProductSchema";
import connectDB from "@/database/db";
import { NextApiRequest, NextApiResponse } from "next";
import Fuse from "fuse.js";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { q } = req.query;

    if (!q || typeof q !== "string") {
      return res
        .status(400)
        .json({ message: "Bad Request: Missing or invalid query" });
    }

    const products = await Product.find(
      {},
      "title brand category thumbnail price rating discountPercentage"
    ).lean();
    const fuse = new Fuse(products, {
      keys: ["title", "brand", "category"],
      threshold: 0.3, // Adjust for more or less fuzzy matching
    });

    const results = fuse.search(q);

    const matchedProducts = results.map((result) => ({
      ...result.item,
      exactMatch: result.score === 0 ? 1 : 0,
    }));

    const sortedProducts = matchedProducts.sort(
      (a, b) => b.exactMatch - a.exactMatch
    );

    res.status(200).json({ data: sortedProducts, q });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
