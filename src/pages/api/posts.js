import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("learnica");

  switch (req.method) {
    case "GET":
      const posts = await db.collection("posts").find({}).toArray();
      res.json(posts);
      break;
    case "POST":
      const newPost = req.body;
      await db.collection("posts").insertOne(newPost);
      res.status(201).json(newPost);
      break;
    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
}
