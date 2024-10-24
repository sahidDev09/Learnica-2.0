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
      console.log({onlyMe});
      let query;
      
      if (onlyMe) {
        query = {reviewerEmail: email}
      } else {
        query = {reviewerEmail: {$ne: email}}
      }

      const result = await reviewsCollection.find(query).toArray();
      return res
        // .status(201)
        .json(result);
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
