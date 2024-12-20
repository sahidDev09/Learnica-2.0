import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    // Ensure a database connection is established
    const client = await clientPromise;
    const db = client.db("learnica");
    const answersCollection = db.collection("qna-ans");

    if (req.method === "GET") {
      const courseId = req.query?.courseId
      const result = await answersCollection.find({qid: req.query.id, courseId}).toArray();      
      return res.json(result);
    } 
    // --------- POST -------------
    else if (req.method === "POST") {
      const newAnswer = req.body;
      // Insert new question into the database
      await answersCollection.insertOne(newAnswer);
      return res.json({ success: true, message: "question successfully inserted!" });
    }  
    // ------- delete ------------ 
    else if (req.method === "DELETE") {
      const ansId = req.body.ansId;
      await answersCollection.deleteOne({_id: new ObjectId(ansId)})
      return res.json({ success: true, message: "Answer deleted successfully!" });
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
