import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { id } = req.query;

  // Validate the course ID
  if (!id) {
    return res.status(400).json({ message: "Course ID is required" });
  }

  let objectId;
  try {
    objectId = new ObjectId(id);
  } catch {
    return res.status(400).json({ message: "Invalid Course ID format" });
  }

  // Handle GET request - Fetch the course
  if (req.method === "GET") {
    try {
      const client = await clientPromise;
      const course = await client
        .db("learnica")
        .collection("courses")
        .findOne({ _id: objectId });

      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      return res.status(200).json(course);
    } catch (error) {
      console.error("Error fetching course:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // Handle PUT request - Update the course
  if (req.method === "PUT") {
    const updatedData = req.body;

    try {
      const client = await clientPromise;
      const result = await client
        .db("learnica")
        .collection("courses")
        .updateOne({ _id: objectId }, { $set: updatedData });

      if (result.modifiedCount === 0) {
        return res
          .status(404)
          .json({ message: "Course not found or no changes made" });
      }

      return res.status(200).json({ message: "Course updated successfully" });
    } catch (error) {
      console.error("Error updating course:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // If the method is not GET or PUT, return Method Not Allowed
  res.setHeader("Allow", ["GET", "PUT"]);
  return res.status(405).json({ message: "Method Not Allowed" });
}
