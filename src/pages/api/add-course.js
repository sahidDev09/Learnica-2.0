import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("learnica");
    const courseCollection = db.collection("courses");

    if (req.method === "POST") {
      const newCourse = req.body;

      // Insert new course into the database
      await courseCollection.insertOne(newCourse);
      return res.status(201).json({ success: true, message: "Course added!" });
    } else {
      return res
        .status(405)
        .json({ success: false, message: "Method Not Allowed" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}
