import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("learnica");
    const resourcesCollection = db.collection("resources");

    if (req.method === "GET") {
      const { courseId } = req.query;

      if (!courseId) {
        return res.status(400).json({ message: "courseId is required" });
      }
      const resources = await resourcesCollection.find({ courseId }).toArray();

      res.status(200).json(resources);
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}
