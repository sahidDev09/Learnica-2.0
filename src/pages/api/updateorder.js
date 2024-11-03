import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function PATCH(request) {
  // Change to default export
  try {
    const { id, progress } = await request.json();

    // Ensure required fields are present
    if (!id || progress === undefined) {
      return NextResponse.json(
        { success: false, message: "Missing required fields: id, progress" },
        { status: 400 }
      );
    }

    // Validate progress (0–100)
    const parsedProgress = parseInt(progress, 10);
    if (isNaN(parsedProgress) || parsedProgress < 0 || parsedProgress > 100) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid progress value. Must be between 0 and 100.",
        },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("learnica");

    // Update the order progress based on _id
    const result = await db
      .collection("orders")
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { progress: parsedProgress } }
      );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Progress successfully updated" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update Progress API Error:", error);
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
