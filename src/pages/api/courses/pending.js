import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  await client.connect();
  const db = client.db("learnica");
  const courseCollection = db.collection("courses");
  if (req.method === "GET") {
    const pendingCourses = await courseCollection
      .find({ status: "pending" })
      .toArray();
    res.status(200).json(pendingCourses);
  }
}
