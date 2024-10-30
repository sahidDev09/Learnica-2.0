import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("learnica");
    const ordersCollection = db.collection("orders");

    if (req.method === "GET") {
      const { courseId } = req.query;

      // Check if courseId query parameter is provided
      if (!courseId) {
        return res
          .status(400)
          .json({ success: false, message: "Course ID is required" });
      }

      // Find orders by courseId
      const result = await ordersCollection.find({ courseId }).toArray();

      if (result.length === 0) {
        return res
          .status(404)
          .json({
            success: false,
            message: "No orders found for this course ID",
          });
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
