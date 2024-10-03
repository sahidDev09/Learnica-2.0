import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ message: "Course ID is required" });
  }

  let objectId;
  try {
    objectId = new ObjectId(id);
  } catch {
    return res.status(400).json({ message: "Invalid Course ID format" });
  }

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
