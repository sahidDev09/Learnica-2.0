import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("learnica");
    const ordersCollection = db.collection("orders");

    if (req.method === "GET") {
      const result = await ordersCollection.find({}).toArray();
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
