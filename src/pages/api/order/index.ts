import connectDB from "@/database/db";
import Order from "@/Schemas/server/OrderSchema";
import verifyUser from "../middleware/verifyUser";
import { getDayDifference } from "@/utils/client/formatDate";
import { NextApiRequest, NextApiResponse } from "next";

const now = new Date();
const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
const currentTime = new Date(now.getTime() + istOffset).toISOString();
// Main handler for API routing
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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

async function addOrder(req: any, res: NextApiResponse) {
  try {
    const { userId } = req;
    const { productID, quantity, title, size, image, price, address } =
      req.body;

    if (!userId || !productID || !address) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }
    const initialStatusOrder = {
      Order_Received: { status: "Done", time: currentTime },
      Order_Shipped: { status: "InHere", time: "" },
      Order_Picked: { status: "pending", time: "" },
      Out_for_delivery: { status: "pending", time: "" },
      Order_Delivered: { status: "pending", time: "" },
    };

    const newOrder = new Order({
      userId,
      productID,
      quantity,
      title,
      size,
      image,
      price,
      address,
      DeliveryDate: currentTime,
      StatusOrder: initialStatusOrder,
    });

    await newOrder.save();
    return res.status(201).json({ success: true, data: newOrder });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

// Handler for updating the order status
async function updateOrderStatus(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { orderId, orderStatus, cancelReason, statusUpdate } = req.body;

    if (
      !orderId ||
      !orderStatus ||
      !statusUpdate ||
      !statusUpdate.key ||
      !statusUpdate.value
    ) {
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
    let statusUpdated = false;

    // Update the status order based on the statusUpdate provided
    let nextKey = null;
    for (const key in order.StatusOrder) {
      if (key === statusUpdate.key) {
        order.StatusOrder[key].status = statusUpdate.value;
        order.StatusOrder[key].time = currentTime;
        statusUpdated = true;
      } else if (statusUpdated && nextKey === null) {
        order.StatusOrder[key].status = "InHere";
        nextKey = key;
      } else if (
        nextKey !== null &&
        order.StatusOrder[key].time === "pending"
      ) {
        order.StatusOrder[key].time = "";
      }
    }
    if (orderStatus === "Done") {
      order.OrderStatus = orderStatus;
    }
    order.cancelReason = cancelReason;

    if (orderStatus === "cancelled") {
      order.OrderStatus = orderStatus;
      for (const key in order.StatusOrder) {
        if (order.StatusOrder[key].status === "pending") {
          order.StatusOrder[key].status = "cancelled";
        }
      }
    }

    if (
      orderStatus === "returned" &&
      getDayDifference(order.DeliveryDate, currentTime) < 6
    ) {
      order.OrderStatus = orderStatus;
      order.DeliveryDate = currentTime; // Update to the return date
    } else {
      order.DeliveryDate = currentTime;
    }

    await order.save();
    return res.status(200).json({ success: true, data: order });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

// Handler for getting all orders for a specific user
async function getOrdersByUser(req: any, res: NextApiResponse) {
  try {
    const { userId } = req;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing userId" });
    }

    const orders = await Order.find({ userId }).select("-userId -__v");

    return res.status(200).json({ success: true, data: orders });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
