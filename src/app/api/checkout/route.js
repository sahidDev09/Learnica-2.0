// src/app/api/checkout/route.js

import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const { userId, email, totalAmount, items } = await request.json();

    if (!userId || !email || !totalAmount || !items) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields: userId, email, totalAmount, items',
        },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('learnica');
    const ordersCollection = db.collection('orders');
    
    // Prepare the order object
    const order = {
      userId,
      email,
      totalAmount: parseFloat(totalAmount),
      items: items.map((item) => ({
        concept_title: item.concept_title,
        concept_url: item.concept_url,
        price: parseFloat(item.price),  // Using price from the frontend
        duration: item.duration,
        lang_tech: item.lang_tech,
        rating: item.rating,
        quantity: item.quantity || 1,  // Default quantity if missing
      })),
      createdAt: new Date(),
    };

    const result = await ordersCollection.insertOne(order);

    return NextResponse.json(
      {
        success: true,
        message: 'Order successfully placed!',
        orderId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Checkout API Error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal Server Error',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
