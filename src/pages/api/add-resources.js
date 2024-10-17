import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    // Ensure a database connection is established
    const client = await clientPromise;
    const db = client.db("learnica");
    const resourcesCollection = db.collection("resources");

    // Handle the POST request
    if (req.method === "POST") {
      const newResources = req.body;

      // Insert new course into the database
      await resourcesCollection.insertOne(newResources);
      return res
        .status(201)
        .json({ success: true, message: "Review successfully inserted!" });
    } else {
      // Handle unsupported HTTP methods
      return res
        .status(405)
        .json({ success: false, message: "Method Not Allowed" });
    }
  } catch (error) {
    // Handle any errors during the request
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
