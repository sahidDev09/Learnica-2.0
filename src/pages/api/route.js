import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { userId, email, title, type, status, items } = await request.json();
    if (!userId || !email || !title || !status || !type|| !items || items.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields: userId, email, title, or items" },
        { status: 400 }
      );
    }
    const finalAmount = items.reduce((total, item) => {
      return total + item.price * item.quantity; 
    }, 0);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(finalAmount * 100), 
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        userId,
        email,
        items: JSON.stringify(items),
      },
    });

    const client = await clientPromise;
    const db = client.db("learnica");
    const ordersCollection = db.collection("orders");

    const formattedItems = items.map((item) => ({
      concept_title: item.concept_title,
      concept_url: item.concept_url,
      amount: parseFloat(item.price),
      duration: item.duration,
      lang_tech: item.lang_tech,
      rating: item.rating,
      quantity: item.quantity,
    }));

    const newOrder = {
      userId,
      email,
      title,
      status,
      type,
      finalAmount: finalAmount, 
      items: formattedItems,
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
