import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("learnica");
  const classesCollection = db.collection("live_classes");

  if (req.method === "GET") {
    try {
      // Fetch all classes
      const classes = await classesCollection.find().toArray(); // Get all classes
      res.status(200).json(classes);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ message: "Class ID is required" });
      }

      const result = await classesCollection.deleteOne({ _id: new ObjectId(id) });
      
      if (result.deletedCount === 1) {
        res.status(200).json({ message: "Live class terminated successfully" });
      } else {
        res.status(404).json({ message: "Live class not found" });
      }
    } catch (error) {
      console.error("Error deleting class:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["GET", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
