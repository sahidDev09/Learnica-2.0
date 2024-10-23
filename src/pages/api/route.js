import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    // Step 1: Parse the request JSON
    const { amount, userId, email, title, items } = await request.json();

    // Step 2: Validate the input data
    if (!amount || !userId || !email || !title || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields: amount, userId, email, title, or items" },
        { status: 400 }
      );
    }

    // Step 3: Create a Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),  // Convert amount to cents
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        userId,
        email,
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
      title,
      cardType: paymentIntent.payment_method_details?.card?.brand || "unknown",  // Get card type from payment intent
      paymentStatus: paymentIntent.status,  // Get payment status from payment intent
      totalAmount: parseFloat(amount),
      items: formattedItems,
      createdAt: new Date(),
    };

    // Insert the new order into the orders collection
    const result = await ordersCollection.insertOne(newOrder);

    // Step 6: Return the client secret, orderId, status, and card type to the frontend
    return NextResponse.json({
      success: true,
      message: "Order successfully placed!",
      clientSecret: paymentIntent.client_secret,
      orderId: result.insertedId,
      status: paymentIntent.status,  // Payment status from the payment intent
      cardType: newOrder.cardType,  // Card type from the newOrder object
    }, { status: 201 });

  } catch (error) {
    console.error("Checkout API Error:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error.message}` },
      { status: 500 }
    );
  }
}
