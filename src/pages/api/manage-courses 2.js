import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("learnica");

  if (req.method === "GET") {
    const { email } = req.query;

    try {
      // If email is provided, filter by email; otherwise return all courses
      const query = email ? { authorEmail: email } : {};
      const courses = await db.collection("courses").find(query).toArray();

      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ error: "Failed to load courses" });
    }
  }

  if (req.method === "DELETE") {
    const { id } = req.query; // Get the course ID from the query

    if (!id || !ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid course ID" });
    }

    try {
      // Delete the course by ID
      const result = await db.collection("courses").deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: "Course not found" });
      }

      return res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
      console.error("Error deleting course:", error);
      return res.status(500).json({ error: "Failed to delete course" });
    }
  }

  // Handle unsupported methods
  res.setHeader("Allow", ["GET", "DELETE"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
