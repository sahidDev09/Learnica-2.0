import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { finalAmount, userId, email, lectures } = await request.json();

    // Validate finalAmount
    if (!finalAmount || finalAmount <= 0) {
      return NextResponse.json({ success: false, message: "Invalid amount" }, { status: 400 });
    }

    const simplifiedItems = lectures.map(lectures => lectures.concept_title).join(', ');

    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(finalAmount * 100), 
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        userId,
        email,
        lectures: simplifiedItems,
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
