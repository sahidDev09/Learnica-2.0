// pages/api/all-courses.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI; // Add your MongoDB URI in .env.local
const client = new MongoClient(uri);

export default async function handler(req, res) {
  try {
    await client.connect();
    const db = client.db("learnica"); // Your database name
    const courseCollection = db.collection("courses"); // Your collection name

    const result = await courseCollection.find().toArray(); // Fetch all courses
    res.status(200).json(result); // Send response
  } catch (error) {
    res.status(500).json({ error: "Error fetching courses" });
  } finally {
    await client.close(); // Close the connection after query execution
  }
}
