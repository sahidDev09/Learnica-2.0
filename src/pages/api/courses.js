import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("learnica");
    const courseCollection = db.collection("courses");

    switch (req.method) {
      case "GET":
        try {
          const posts = await courseCollection.find({}).toArray();
          return res.status(200).json(posts); // Return 200 for successful GET
        } catch (error) {
          return res.status(500).json({ error: "Failed to fetch courses" }); // Handle errors in fetching
        }

      case "POST":
        const newPost = req.body;

        // Basic validation for newPost (can be expanded based on requirements)
        if (!newPost.title || !newPost.description) {
          return res
            .status(400)
            .json({ error: "Title and Description are required" });
        }

        try {
          await courseCollection.insertOne(newPost);
          return res.status(201).json(newPost); // Return 201 for successful POST
        } catch (error) {
          return res
            .status(500)
            .json({ error: "Failed to create a new course" }); // Handle errors in insertion
        }

      default:
        return res.status(405).json({ error: "Method Not Allowed" }); // Return 405 for unsupported methods
    }
  } catch (error) {
    return res.status(500).json({ error: "Database connection failed" }); // Handle DB connection issues
  }
}
