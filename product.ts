import mongoose, { Schema } from "mongoose";

const commonFields = {
  title: { type: String, default: "" },
  stock: { type: Number, default: 0 },
  soldCount: { type: Number, default: 0 },
  // category: {
  //   type: String,
  //   required: true,
  //   enum: [
  //     "Kurti",
  //     "Chunni",
  //     "Naira",
  //     "Sharara",
  //     "Jeans",
  //     "Tops",
  //     "Lehenga",
  //     "Jeggings",
  //     "Long Dress",
  //     "Hot Pants",
  // "Churidar Pants",
  //     "Jacket",
  //     "Mobile",
  //     "Airboat",
  //     "T-Shirt",
  //     "Shirt",
  //     "Watch",
  //     "Jeans Pant",
  //     "Half Pant",
  //     "Hoodies",
  //     "Shoes",
  //     "Sharee",
  //   ],
  // },
  category: { type: String, default: "" }, // from category collection
  sub_category: { type: String, default: "" }, // from category collection
  seller_id: { type: Schema.Types.ObjectId, ref: "Seller" },
};
const mobileFields = {
  Brand: { type: String, default: "" },
  Model: { type: String, default: "" },
  Storage: { type: String, default: "" },
  RAM: { type: String, default: "" },
  ROM: { type: String, default: "" },
  Os_And_Processor_Features: {
    Processor_Type: { type: String, default: "" },
    Operating_System: { type: String, default: "" },
    Processor_Brand: { type: String, default: "" },
    Processor_Core: { type: String, default: "" },
  },
  Camera_Features: {
    Primary_Camera: { type: String, default: "" },
    Primary_Camera_Features: { type: String, default: "" },
    Secondary_Camera: { type: String, default: "" },
    Secondary_Camera_Features: { type: String, default: "" },
  },
  Battery: {
    Capacity: { type: String, default: "" },
    Battery_Type: { type: String, default: "" },
    Fast_Charging: { type: Boolean, default: false },
  },
  Sensors: {
    Fingerprint_Sensor: { type: Boolean, default: false },
    Accelerometer: { type: Boolean, default: false },
    Gyroscope: { type: Boolean, default: false },
    Proximity_Sensor: { type: Boolean, default: false },
    Compass: { type: Boolean, default: false },
  },
  Call_Features: {
    Video_Call_Support: { type: Boolean, default: false },
    Speaker_Phone: { type: Boolean, default: false },
  },
  Connectivity: {
    Network_Type: { type: String, default: "" },
    Supported_Networks: { type: [String], default: [] },
    WiFi: { type: String, default: "" },
    Bluetooth: { type: String, default: "" },
    NFC: { type: Boolean, default: false },
    USB: { type: String, default: "" },
  },
  General: {
    In_The_Box: {
      type: String,
      default: "",
    },
    Model_Number: { type: String, default: "" },
    Model_Name: { type: String, default: "" },
    Category: { type: String, default: "" },
    Sim_Type: { type: String, default: "" },
    Touch_Screen: { type: Boolean, default: false },
  },
  Warranty: {
    warranty_year: { type: String, default: "" },
    warranty_summary: { type: String, default: "" },
  },
  Dimensions: {
    width: { type: String, default: "" },
    height: { type: String, default: "" },
    depth: { type: String, default: "" },
    weight: { type: String, default: "" },
  },
  Display_Features: {
    Display_Size: { type: String, default: "" },
    Resolution: { type: String, default: "" },
    Resolution_Type: { type: String, default: "" },
    GPU: { type: String, default: "" },
    displayType: { type: String, default: "" },
    otherDisplayFeatures: { type: String, default: "" },
  },
};
const shirtFields = {
  gender: {
    type: String,
    enum: ["Male", "Female", "Unisex"],
    required: true,
  },
  Collar: {
    type: String,
    enum: [
      "Built-up",
      "Button Down",
      "Club",
      "Collarless",
      "Curved Collar",
      "Cut Away",
      "Double Collar",
      "Hood",
      "Lapel",
      "Mandarin",
      "Peter Pan",
      "Ribbed Collar",
      "Ruffle Collar",
      "Slim",
      "Spread",
      "Tie up",
      "Wingtip"
    ],
    required: true,
  },
  Combo_Quantity: {
    // kurti
    type: Number,
    required: true,
  }, // Number of items in the pack
  Fabric_Care: {
    type: String,
    enum: ["Machine Wash", "Hand Wash", "Dry Clean Only", "Do Not Bleach"],
    required: true,
  },
  Neck_Type: {
    type: String,
    enum: ["Round Neck", "V-Neck", "Polo Neck", "Henley", "Mandarin Collar"],
    required: true,
  },
  Occasion: {
    type: String,
    enum: [
      "Casual",
      "Formal",
      "Party",
      "Sports",
      "Festive",
      "Beach",
      "Work",
      "Wedding",
      "Travel",
      "Other"
    ],
    required: true,
  },
  Fabric: {
    // kurti
    type: String,
    enum: [
      "Chiffon",
      "Corduroy",
      "Cotton Blend",
      "Cotton Linen",
      "Cotton Lycra",
      "Cotton Silk",
      "Crepe",
      "Denim",
      "Georgette",
      "Hemp",
      "Linen Blend",
      "Liva",
      "Lycra Blend",
      "Lyocell",
      "Modal",
      "Net/Lace",
      "Nylon",
      "Poly Silk",
      "Poly Viscose",
      "Polycotton",
      "Polyester",
      "Pure Cotton",
      "Pure Linen",
      "Pure Silk",
      "Satin",
      "Silk Blend",
      "Viscose Rayon",
      "Wool Blend"
    ],
    required: true,
  },
  Sleeve: {
    type: String,
    enum: [
      "Full Sleeve",
      "Half Sleeve",
      "Sleeveless",
      "Cap Sleeve",
      "Roll-Up Sleeve",
    ],
    required: true,
  },
  Design: {
    type: String,
    enum: [
      "Striped",
      "Floral",
      "Plain",
      "Checked",
      "Printed",
      "Solid",
      "Abstract",
    ],
    required: true,
  },
};
const variantFields = {
  variants: [
    {
      color_name: { type: String, default: "" },
      required: [true, "Color name is required"],
      trim: true,
      images: { type: [String], default: [] },
      thumbnail: { type: String, default: "" },
      sub_variants: {
        size: {
          type: String,
          enum: {
            values: ["S", "M", "L", "XL", "XXL", "XXXL"], // Valid sizes
            message: "{VALUE} is not a valid size", // Error message for invalid enum values
          },
          required: [true, "Size is required"],
        },
        quantity: {
          type: Number,
          default: 0,
          require: [true, "Quantity is required"],
          min: [0, "Quantity cannot be less than 0"],
        },
        stock: {
          type: Number,
          default: 0,
          min: [0, "Stock cannot be less than 0"],
        },
      },
    },
  ],
};
export const createProductSchema = (category: string) => {
  const fields = { ...commonFields };
  if (category === "Mobile") {
    Object.assign(fields, mobileFields);
  } else if (category === "Shirt") {
    Object.assign(fields, shirtFields);
  } else {
    throw new Error("Category not supported.");
  }
  const ProductSchema = new Schema(fields);
  return mongoose.models.Product || mongoose.model("Product", ProductSchema);
};
