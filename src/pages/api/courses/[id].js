import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("learnica");
    const courseCollection = db.collection("courses");

    switch (req.method) {
      case "GET":
        // Fetch a specific course by ID from the URL (req.query.id for dynamic route)
        const { id } = req.query;

        if (!id) {
          return res.status(400).json({ message: "Course ID is required" });
        }

        let objectId;
        try {
          objectId = new ObjectId(id); // Ensure it's a valid ObjectId
        } catch (error) {
          return res.status(400).json({ message: "Invalid Course ID format" });
        }

        try {
          const course = await courseCollection.findOne({ _id: objectId });

          if (!course) {
            return res.status(404).json({ message: "Course not found" });
          }

          return res.status(200).json(course);
        } catch (error) {
          console.error("Error fetching course by ID:", error);
          return res.status(500).json({ message: "Internal Server Error" });
        }

      default:
        return res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Connection or server error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
