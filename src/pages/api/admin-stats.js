import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    // Ensure a database connection is established
    const client = await clientPromise;
    const db = client.db("learnica");
    const coursesCollection = db.collection("courses");
    const customCoursesCollection = db.collection("concepts");
    const usersCollection = db.collection("users");

    if (req.method === "GET") {
      const totalCourses = await coursesCollection.estimatedDocumentCount()
      const totalCustomCourses = await customCoursesCollection.estimatedDocumentCount()
      const totalUsers = await usersCollection.estimatedDocumentCount()
      return res.json({totalCourses, totalCustomCourses, totalUsers});
    } 
    else {
      // Handle unsupported HTTP methods
      return res
        .status(405)
        .json({ success: false, message: "Method Not Allowed" });
    }
  } catch (error) {
    // Handle any errors during the request
    return res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
  }
}
