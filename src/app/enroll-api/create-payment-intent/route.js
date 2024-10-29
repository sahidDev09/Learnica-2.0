import { NextResponse } from "next/server";
import Stripe from "stripe";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb"; 

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { userId, courseId, finalAmount, email, title } = await request.json();

    if (!finalAmount || finalAmount <= 0) {
      return NextResponse.json({ success: false, message: "Invalid amount" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("learnica");
    const courseData = await db.collection("courses").findOne({ _id: new ObjectId(courseId) });

    if (!courseData) {
      return NextResponse.json({ success: false, message: "Course not found" }, { status: 404 });
    }

    const lectureTitles = courseData.lectures.map((lecture) => lecture.title).join(", ");

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(finalAmount * 100),
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        userId,
        courseId,
        email,
        title,
        lectures: lectureTitles.slice(0, 490),
      },
    });

    return NextResponse.json(
      {
        success: true,
        clientSecret: paymentIntent.client_secret,
        paymentIntent,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
