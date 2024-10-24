import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("learnica");

    if (req.method === "POST") {
      const { title, description } = req.body;

      // Validate incoming data
      if (!title || !description) {
        return res.status(400).json({
          success: false,
          message: "Title and Description are required",
        });
      }

      // Insert new course into the database
      const newCourse = await db
        .collection("courses")
        .insertOne({ title, description });

      // Prepare notification message
      const notificationMessage = `A new course titled "${title}" has been uploaded!`;

      // Fetch all users and create notifications
      const users = await db.collection("users").find().toArray();
      const notifications = users.map((user) => ({
        userId: user._id,
        message: notificationMessage,
        courseId: newCourse.insertedId,
        createdAt: new Date(),
        isRead: false,
      }));

      // Insert notifications into the database
      await db.collection("notifications").insertMany(notifications);

      return res.status(201).json({ success: true, message: "Course added!" });
    } else {
      return res
        .status(405)
        .json({ success: false, message: "Method Not Allowed" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}
