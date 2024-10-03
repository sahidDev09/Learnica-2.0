import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("learnica");
    const classesCollection = db.collection("live_classes");

    // Fetch all classes
    const classes = await classesCollection.find().toArray(); // Get all classes

  res.status(200).json(classes);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
