import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    // Ensure a database connection is established
    const client = await clientPromise;
    const db = client.db("learnica");
    const questionsCollection = db.collection("qna-ques");
    const answersCollection = db.collection("qna-ans");

    if (req.method === "GET") {
      const result = await questionsCollection.find({}).toArray();
      return res.json(result);
    } 
    // --------- POST -------------
    else if (req.method === "POST") {
      const newQuestion = req.body;
      // Insert new question into the database
      await questionsCollection.insertOne(newQuestion);
      return res.json({ success: true, message: "question successfully inserted!" });
    }  
    // ------- delete ------------ 
    else if (req.method === "DELETE") {
      const questionId = req.body.questionId;
      await questionsCollection.deleteOne({_id: new ObjectId(questionId)})
      // delete all ans related to the question also
      await answersCollection.deleteMany({qid: questionId})
      return res.json({ success: true, message: "question deleted successfully!" });
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
