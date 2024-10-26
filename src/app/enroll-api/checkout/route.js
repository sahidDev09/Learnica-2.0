import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb"; // Import ObjectId

export async function POST(request) {
  try {
    const { userId, courseId, email, title, totalAmount, status } = await request.json();

    if (!userId || !courseId || !email || !title || !totalAmount || !status) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields: userId, courseId, email, title, totalAmount, status",
        },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("learnica");

    // Use 'new ObjectId(courseId)' to create a new ObjectId instance
    const courseData = await db.collection("courses").findOne({ _id: new ObjectId(courseId) });

    if (!courseData) {
      return NextResponse.json({ success: false, message: "Course not found" }, { status: 404 });
    }

    const order = {
      userId,
      courseId,
      email,
      title,
      status,
      totalAmount: parseFloat(totalAmount),
      items: courseData.lectures.map((lecture) => ({
        concept_title: lecture.title,
        concept_url: lecture.videoUrl,
        duration: lecture.duration,
      })),
      createdAt: new Date(),
    };

    const result = await db.collection("orders").insertOne(order);

    return NextResponse.json(
      {
        success: true,
        message: "Order successfully placed!",
        orderId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Checkout API Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
