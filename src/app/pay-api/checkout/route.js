import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const { userId, email, title, finalAmount, status, items } = await request.json();

    // Check for required fields
    if (!userId || !email || !title || !finalAmount || !status || !items) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields: userId, email, title, finalAmount, status, items',
        },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('learnica');
    const ordersCollection = db.collection('orders');

    const order = {
      userId,
      email,
      title,
      status,
      finalAmount: parseFloat(finalAmount), // Ensure it's a float
      items: items.map((item) => ({
        concept_title: item.concept_title,
        concept_url: item.concept_url,
        price: parseFloat(item.price), // Ensure price is a float
        duration: item.duration,
        lang_tech: item.lang_tech,
        rating: item.rating,
        quantity: item.quantity || 1, // Default quantity to 1 if not provided
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
