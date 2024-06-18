import connectDB from "@/database/db";
import Order from "@/Schemas/server/OrderSchema";
import verifyUser from "../middleware/verifyUser";

// Handler for adding a new order

// Main handler for API routing
export default async function handler(req, res) {
  await connectDB();

  const { method } = req;

  switch (method) {
    case "GET":
      return verifyUser(getOrdersByUser)(req, res);
    case "POST":
      return verifyUser(addOrder)(req, res);
    case "PUT":
      return verifyUser(updateOrderStatus)(req, res);
    default:
      res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
async function addOrder(req, res) {
  try {
    const { userId } = req;
    const { productID, quantity, title, image, price, address } = req.body;

    if (!userId || !productID || !address) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const newOrder = new Order({
      userId,
      productID,
      quantity,
      title,
      image,
      price,
      address,
    });

    await newOrder.save();
    return res.status(201).json({ success: true, data: newOrder });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

// Handler for updating the order status
async function updateOrderStatus(req, res) {
  try {
    const { orderId, orderStatus } = req.body;

    if (!orderId || !orderStatus) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    order.OrderStatus = orderStatus;
    order.DeliveryDate = new Date(now.getTime() + istOffset);

    await order.save();
    return res.status(200).json({ success: true, data: order });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

// Handler for getting all orders for a specific user
async function getOrdersByUser(req, res) {
  try {
    const { userId } = req;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing userId" });
    }

    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res
        .status(404)
        .json({ success: false, message: "No orders found for this user" });
    }

    return res.status(200).json({ success: true, data: orders });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
