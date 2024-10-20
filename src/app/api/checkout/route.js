// src/app/api/checkout/route.js

import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const { userId, email, totalAmount, items, duration } = await request.json();

    console.log('Received checkout data:', { userId, email, totalAmount, items, duration });

    // Validate required fields
    if (!userId || !email || !totalAmount || !items) {
      console.error('Missing required fields: userId, email, totalAmount, or items');
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
    const ordersCollection = db.collection('orders'); // Ensure this collection exists

    const order = {
      userId,
      email,
      totalAmount: parseFloat(totalAmount),
      items: items.map((item) => ({
        concept_title: item.concept_title,
        concept_url: item.concept_url,
        amount: parseFloat(item.price),
        duration: item.duration,
        lang_tech: item.lang_tech,
        rating: item.rating,
        quantity: item.quantity,
      })),
      duration,
      createdAt: new Date(),
    };

    console.log('Creating order:', order);

    const result = await ordersCollection.insertOne(order);

    console.log(`Order inserted with ID: ${result.insertedId}`);

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
