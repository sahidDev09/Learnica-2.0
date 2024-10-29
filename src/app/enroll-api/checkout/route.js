import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb"; 

export async function POST(request) {
  try {
    const { userId, courseId, email, title,type, finalAmount, status } = await request.json();

    if (!userId || !courseId || !email || !title || !type|| finalAmount === undefined || !status) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields: userId, courseId, email, title, finalAmount, status",
        },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("learnica");

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
      type,
      finalAmount: parseFloat(finalAmount), 
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
