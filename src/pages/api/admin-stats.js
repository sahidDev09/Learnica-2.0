import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    // Ensure a database connection is established
    const client = await clientPromise;
    const db = client.db("learnica");
    const coursesCollection = db.collection("courses");
    const customCoursesCollection = db.collection("concepts");
    const usersCollection = db.collection("users");
    const questionsCollection = db.collection("qna-ques");
    const answersCollection = db.collection("qna-ans");
    const ordersCollection = db.collection("orders");

    if (req.method === "GET") {
      const totalCourses = await coursesCollection.estimatedDocumentCount()
      const totalCustomCourses = await customCoursesCollection.estimatedDocumentCount()
      const totalUsers = await usersCollection.estimatedDocumentCount()
      const totalSuccessfulOrders = await ordersCollection.countDocuments({status: "success"})
      const totalQuestions = await questionsCollection.estimatedDocumentCount()
      const totalAnswers = await answersCollection.estimatedDocumentCount()
      const totalQnA = totalQuestions + totalAnswers
      const userTypes = await usersCollection.find({}, {
        projection: {_id: 0, role: 1, mainRole: 1, status: 1}}
      ).toArray();
      
      // ------ get 3 days data --------
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      const todayEnd = new Date();
      todayEnd.setHours(23, 59, 59, 999);

      const prevDayStart = new Date(todayStart);
      prevDayStart.setDate(todayStart.getDate() - 1);
      const prevDayEnd = new Date(todayEnd);
      prevDayEnd.setDate(todayEnd.getDate() - 1);

      const otherDayStart = new Date(prevDayStart);
      otherDayStart.setDate(prevDayStart.getDate() - 1);
      const otherDayEnd = new Date(prevDayEnd);
      otherDayEnd.setDate(prevDayEnd.getDate() - 1);

      const todaysCourseCount = await ordersCollection.countDocuments({ 
        createdAt: { $gte: todayStart, $lte: todayEnd }, status: "success" 
      })
      const prevDaysCourseCount = await ordersCollection.countDocuments({ 
        createdAt: { $gte: prevDayStart, $lte: prevDayEnd }, status: "success" 
      })
      const otherDaysCourseCount = await ordersCollection.countDocuments({ 
        createdAt: { $gte: otherDayStart, $lte: otherDayEnd }, status: "success" 
      })
      const count3DaysCourses = {day1: todaysCourseCount, day2: prevDaysCourseCount, day3: otherDaysCourseCount}
      
      // return
      return res.json({totalCourses, totalCustomCourses, totalUsers, userTypes, totalQnA, totalSuccessfulOrders, count3DaysCourses});
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
