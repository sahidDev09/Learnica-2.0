import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    // Ensure a database connection is established
    const client = await clientPromise;
    const db = client.db("learnica");
    const reviewsCollection = db.collection("reviews");

    // Handle the POST request
    if (req.method === "GET") {
      const email = req.query.email
      const onlyMe = req.query.onlyMe
      const courseId = req.query?.courseId

      let query;
      
      if (onlyMe) {
        query = {reviewerEmail: email, courseId}
      } else {
        query = {reviewerEmail: {$ne: email}, courseId}
      }

      const result = await reviewsCollection.find(query).toArray();
      return res.json(result);
    } 
    // Handle the POST request
    else if (req.method === "POST") {
      const newReview = req.body;

      // Insert new course into the database
      await reviewsCollection.insertOne(newReview);
      return res.json({ success: true, message: "Review successfully inserted!" });
    }
    // ------- delete ------------ 
    else if (req.method === "DELETE") {
      const reviewerEmail = req.body.email;
      await reviewsCollection.deleteOne({reviewerEmail})
      return res.json({ success: true, message: "review deleted successfully!" });
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
