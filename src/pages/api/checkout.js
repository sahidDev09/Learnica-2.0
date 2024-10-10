import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
   
    const client = await clientPromise;
    const db = client.db("learnica");
    const checkoutCollection = db.collection("customizedCourse"); 
    if (req.method === "POST") {
      const { userId, email, totalAmount } = req.body;
      if (!userId || !email || !totalAmount) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields: userId, email, totalAmount",
        });
      }
      const checkOut = {
        userId,
        email,
        totalAmount: parseFloat(totalAmount),
        createdAt: new Date(),
      };

      await checkoutCollection.insertOne(checkOut);
      return res
        .status(201)
        .json({ success: true, message: "Successfully Paid!" });
    } else {
      return res
        .status(405)
        .json({ success: false, message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Checkout API Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
