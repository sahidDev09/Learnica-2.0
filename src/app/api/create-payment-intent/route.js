import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { amount, userId, email, items } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ success: false, message: "Invalid amount" }, { status: 400 });
    }

    const simplifiedItems = items.map(item => item.concept_title).join(', ');

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),  // Convert amount to cents
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
      status: paymentIntent.status,  // Sending status of the payment
    }, { status: 200 });

  } catch (error) {
    console.error("Error creating payment intent:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
