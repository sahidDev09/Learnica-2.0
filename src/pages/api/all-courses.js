// pages/api/all-courses.js
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI; // Add your MongoDB URI in .env.local
const client = new MongoClient(uri);

export default async function handler(req, res) {
  const { method } = req; // Capture the request method

  try {
    await client.connect();
    const db = client.db("learnica"); // Your database name
    const courseCollection = db.collection("courses"); // Your collection name

    if (method === "GET") {
      // Fetch all courses
      const result = await courseCollection.find().toArray();
      res.status(200).json(result); // Send response
    } else if (method === "DELETE") {
      const { id } = req.query; // Get the course ID from query params
      if (!id) {
        return res.status(400).json({ error: "Course ID is required" });
      }

      // Delete course by ID
      const result = await courseCollection.deleteOne({
        _id: new ObjectId(id),
      });

      if (result.deletedCount === 1) {
        res.status(200).json({ message: "Course deleted successfully" });
      } else {
        res.status(404).json({ error: "Course not found" });
      }
    } else {
      res.setHeader("Allow", ["GET", "DELETE"]); // Inform the allowed methods
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: "Error processing request" });
  } finally {
    await client.close(); // Close the connection after query execution
  }
}
