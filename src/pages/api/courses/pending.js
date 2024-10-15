import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI; // Add your MongoDB URI in .env.local
const client = new MongoClient(uri);

export default async function handler(req, res) {
  await client.connect();
  const db = client.db("learnica"); // Your database name
  const courseCollection = db.collection("courses"); // Your collection name
  if (req.method === "GET") {
    const pendingCourses = await courseCollection
      .find({ status: "pending" })
      .toArray();
    res.status(200).json(pendingCourses);
  }
}
