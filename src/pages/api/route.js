import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    // Step 1: Parse the request JSON
    const { amount, userId, email, items } = await request.json();

    // Step 2: Validate the input data
    if (!amount || !userId || !email || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields: amount, userId, email, or items" },
        { status: 400 }
      );
    }

    // Step 3: Create a Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert amount to cents
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        userId: userId,
        email: email,
        items: JSON.stringify(items), // Store items in metadata for reference
      },
    });

    // Step 4: Store the order details in MongoDB
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
      totalAmount: parseFloat(amount),
      items: formattedItems,
      createdAt: new Date(),
    };

    // Insert the new order into the orders collection
    const result = await ordersCollection.insertOne(newOrder);

    // Step 5: Return the client secret and orderId to the frontend
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
