import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    // Ensure a database connection is established
    const client = await clientPromise;
    const db = client.db("learnica");
    const notesCollection = db.collection("my-notes");

    if (req.method === "GET") {
      const email = req.query?.email
      const result = await notesCollection.find({email}).toArray();
      return res.json(result);
    } 
    // --------- POST -------------
    else if (req.method === "POST") {
      const newNote = req.body;

      // Insert new course into the database
      await notesCollection.insertOne(newNote);
      return res.json({ success: true, message: "Note successfully inserted!" });
    } 
    // --------- PATCH -------------
    else if (req.method === "PATCH") {
      const {data, _id} = req.body;
      
      // udpate edited course into the database
      const filter = {_id: new ObjectId(_id)}
      const updateDoc = { $set: data}
      await notesCollection.updateOne(filter, updateDoc);
      
      return res.json({ success: true, message: "Note successfully edited!" });
    } 
    // ------- delete ------------ 
    else if (req.method === "DELETE") {
      const noteId = req.body.noteId;
      await notesCollection.deleteOne({_id: new ObjectId(noteId)})
      return res.json({ success: true, message: "Note deleted successfully!" });
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
