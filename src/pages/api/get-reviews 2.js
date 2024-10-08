import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    // Ensure a database connection is established
    const client = await clientPromise;
    const db = client.db("learnica");
    const reviewsCollection = db.collection("reviews");

    // Handle the POST request
    if (req.method === "GET") {
      const result = await reviewsCollection.find({}).toArray();
      return res
        // .status(201)
        .json(result);
    } else {
      // Handle unsupported HTTP methods
      return res
        .status(405)
        .json({ success: false, message: "Method Not Allowed" });
    }
  } catch (error) {
    // Handle any errors during the request
    return res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
  }
}
