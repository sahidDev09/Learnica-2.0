import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("learnica");
    const userCollection = db.collection("users");

    // Extract the user ID from the request query
    const { id } = req.query;

    // Validate if the provided ID is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const filter = { _id: new ObjectId(id) };
    const updateDoc = { $set: { status: "blocked" } };

    // Update the user's status to 'blocked'
    const result = await userCollection.updateOne(filter, updateDoc);

    // Check if the user was found
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user's status was successfully updated
    if (result.modifiedCount === 0) {
      return res.status(500).json({ message: "Failed to block the user" });
    }

    // If successful, return a 200 status with a success message
    return res.status(200).json({ message: "User blocked successfully" });
  } catch (error) {
    console.error("Error blocking user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
