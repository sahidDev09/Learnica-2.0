import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("learnica");

  if (req.method === "GET") {
    const { email, id } = req.query;

    try {
      if (id) {
        if (!ObjectId.isValid(id)) {
           return res.status(400).json({ error: "Invalid course ID" });
        }
        const course = await db.collection("courses").findOne({ _id: new ObjectId(id) });
        if (!course) {
          return res.status(404).json({ error: "Course not found" });
        }
        return res.status(200).json(course);
      }

      // If email is provided, filter by email in author.email; otherwise return all courses
      const query = email ? { "author.email": email } : {};
      const courses = await db.collection("courses").find(query).toArray();

      res.status(200).json(courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      res.status(500).json({ error: "Failed to load courses" });
    }
  } else if (req.method === "PUT") {
    const { id } = req.query;
    const updateData = req.body;

    if (!id || !ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid course ID" });
    }

    // Remove _id from updateData if it exists to avoid modification error
    delete updateData._id;

    try {
      const result = await db
        .collection("courses")
        .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

      if (result.matchedCount === 0) {
        return res.status(404).json({ error: "Course not found" });
      }

      return res.status(200).json({ message: "Course updated successfully" });
    } catch (error) {
      console.error("Error updating course:", error);
      return res.status(500).json({ error: "Failed to update course" });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.query;

    if (!id || !ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid course ID" });
    }

    try {
      const result = await db
        .collection("courses")
        .deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: "Course not found" });
      }

      return res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
      console.error("Error deleting course:", error);
      return res.status(500).json({ error: "Failed to delete course" });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
