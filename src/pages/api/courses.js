import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("learnica");
  const courseCollection = db.collection("courses");

  switch (req.method) {
    case "GET":
      const posts = await courseCollection.find({}).toArray();
      res.json(posts);
      break;
    case "POST":
      const newPost = req.body;
      await courseCollection.insertOne(newPost);
      res.status(201).json(newPost);
      break;
    default:
      res.status(405).end();
      break;
  }
}
