import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  const { method } = req;

  try {
    await client.connect();
    const db = client.db("learnica");
    const courseCollection = db.collection("courses");
    if (method === "GET") {
      // Fetch all courses with status "Approved"
      const result = await courseCollection.find({ status: "Approved" }).toArray();
      res.status(200).json(result);

      // -------------------------------------------------
    } else if (method === "DELETE") {
      const { id } = req.query;
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
      res.setHeader("Allow", ["GET", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: "Error processing request" });
  } finally {
    await client.close();
  }
}
