import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("learnica");
  const courseCollection = db.collection("courses");

  switch (req.method) {
    case "POST":
      const newCourse = req.body;
      await courseCollection.insertOne(newCourse);
      res.status(201).json({success: true, message: 'successfully inserted!'});
      break;
    default:
      res.status(405).end();
      break;
  }
}
