import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    // Ensure a database connection is established
    const client = await clientPromise;
    const db = client.db("learnica");
    const courseCollection = db.collection("courses");

    // Handle the POST request
    if (req.method === "POST") {
      const newCourse = req.body;

      // Validate incoming data
      if (!newCourse.title || !newCourse.description) {
        return res.status(400).json({
          success: false,
          message: "Title and Description are required",
        });
      }

      // Insert new course into the database
      await courseCollection.insertOne(newCourse);
      return res
        .status(201)
        .json({ success: true, message: "Course successfully inserted!" });
    } else {
      // Handle unsupported HTTP methods
      return res
        .status(405)
        .json({ success: false, message: "Method Not Allowed" });
    }
  } catch (error) {
    // Handle any errors during the request
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
