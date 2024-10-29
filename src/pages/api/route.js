import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { userId, email, title, type, status, lectures } = await request.json();

   
    if (!userId || !email || !title || !status || !type || !lectures || lectures.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields: userId, email, title, type, status, or lectures" },
        { status: 400 }
      );
    }

    
    const finalAmount = lectures.reduce((total, lecture) => {
      return total + (parseFloat(lecture.price) * (lecture.quantity || 1)); // Ensure quantity defaults to 1 if not provided
    }, 0);

   
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(finalAmount * 100), 
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        userId,
        email,
        lectures: JSON.stringify(lectures),
      },
    });

  
    const client = await clientPromise;
    const db = client.db("learnica");
    const ordersCollection = db.collection("orders");

    
    const formattedLectures = lectures.map((lecture) => ({
      title: lecture.concept_title, 
      videoUrl: lecture.concept_url, 
      price: parseFloat(lecture.price),
      duration: lecture.duration,
      category: lecture.lang_tech,
      rating: lecture.rating,
      quantity: lecture.quantity || 1,
    }));
    

    
    const newOrder = {
      userId,
      email,
      title,
      status,
      type,
      finalAmount: finalAmount,
      lectures: formattedLectures, 
      createdAt: new Date(),
    };

    
    const result = await ordersCollection.insertOne(newOrder);
    
   
    return NextResponse.json({
      success: true,
      message: "Order successfully placed!",
      clientSecret: paymentIntent.client_secret,
      orderId: result.insertedId,
    }, { status: 201 });

  } catch (error) {
    console.error("Checkout API Error:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error.message}` },
      { status: 500 }
    );
  }
}
