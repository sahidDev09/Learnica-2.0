import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { courseId, courseTitle } = req.body;

  // Validate that courseId and courseTitle are provided
  if (!courseId || !courseTitle) {
    return res
      .status(400)
      .json({ message: "Course ID and title are required." });
  }

  try {
    const client = await clientPromise;
    const db = client.db("learnica");
    const coursesCollection = db.collection("courses");

    // Approve the course in MongoDB
    const result = await coursesCollection.updateOne(
      { _id: new ObjectId(courseId) },
      { $set: { approved: true } }
    );

    if (result.modifiedCount > 0) {
      // Emit notification using Socket.io
      if (res.socket.server.io) {
        res.socket.server.io.emit("courseApproved", {
          title: courseTitle,
          _id: courseId,
        });
      }

      return res
        .status(200)
        .json({ message: "Course approved and notification sent." });
    } else {
      return res.status(400).json({ message: "Failed to approve the course." });
    }
  } catch (error) {
    console.error("Error approving course:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
}
