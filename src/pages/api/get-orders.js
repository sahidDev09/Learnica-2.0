import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("learnica");
    const ordersCollection = db.collection("orders");

    if (req.method === "GET") {
      const { email } = req.query;

      // Check if email query parameter is provided
      if (!email) {
        return res
          .status(400)
          .json({ success: false, message: "Email is required" });
      }

      // Find orders by email
      const result = await ordersCollection.find({ email }).toArray();

      if (result.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "No orders found for this email" });
      }

      return res.status(200).json(result);
    } else {
      return res
        .status(405)
        .json({ success: false, message: "Method Not Allowed" });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
