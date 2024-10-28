import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { finalAmount, userId, email, items } = await request.json();

    // Validate finalAmount
    if (!finalAmount || finalAmount <= 0) {
      return NextResponse.json({ success: false, message: "Invalid amount" }, { status: 400 });
    }

    // Simplifying items for metadata
    const simplifiedItems = items.map(item => item.concept_title).join(', ');

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(finalAmount * 100), // Use 'amount' instead of 'finalAmount'
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        userId,
        email,
        items: simplifiedItems,
      },
    });
   
    return NextResponse.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntent, 
    }, { status: 201 });

  } catch (error) {
    console.error("Error creating payment intent:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
