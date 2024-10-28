import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    // Ensure a database connection is established
    const client = await clientPromise;
    const db = client.db("learnica");
    const ordersCollection = db.collection("orders__");
    const coursesCollection = db.collection("courses");

    if (req.method === "GET") {
      const email = req.query?.email
      // > get orders based on email
      const ordersArr = await ordersCollection.find(
        {email, type: "course"}, 
        {projection: {_id: 0, courseId: 1}}
      ).toArray();
      // > get courses forEach order's courseId
      const coursesIds = ordersArr.map(order => new ObjectId(order.courseId))
      const courses = await coursesCollection.find(
        {_id: {$in: coursesIds}}, 
        {projection: {additionalInfo: 1, name: 1, category: 1, publish_date:1, author:1, pricing:1}}
      ).toArray();

      return res.json(courses);
    } 
    else {
      // Handle unsupported HTTP methods
      return res
        .status(405)
        .json({ success: false, message: "Method Not Allowed" });
    }
  } catch (error) {
    // Handle any errors during the request
    return res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
  }
}
