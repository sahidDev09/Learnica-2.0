import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  // Only allow PATCH method
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("learnica");
    const userCollection = db.collection("users");

    // Extract the user ID from the request query
    const { id } = req.query;

    // Validate the provided ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Filter to find the user by ID and update their role to "admin"
    const filter = { _id: new ObjectId(id) };
    const updateDoc = { $set: { mainRole: "admin" } };

    // Perform the update operation
    const result = await userCollection.updateOne(filter, updateDoc);

    // Check if the user was found and updated
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    if (result.modifiedCount === 0) {
      return res
        .status(500)
        .json({ message: "Failed to promote the user to admin" });
    }

    // Return success response
    return res
      .status(200)
      .json({ message: "User successfully promoted to admin" });
  } catch (error) {
    console.error("Error promoting user to admin:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
