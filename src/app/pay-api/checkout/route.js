import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const { userId, email,title, totalAmount, status, items } = await request.json();

    if (!userId || !email || !title || !totalAmount ||!status|| !items) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields: userId, email, title, totalAmount, items',
        },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('learnica');
    const ordersCollection = db.collection('orders')
    const order = {
      userId,
      email,
      title,
      status,
      totalAmount: parseFloat(totalAmount),
      items: items.map((item) => ({
        concept_title: item.concept_title,
        concept_url: item.concept_url,
<<<<<<< HEAD:src/app/api/checkout/route.js
        price: parseFloat(item.price), 
        duration: item.duration,
        lang_tech: item.lang_tech,
        rating: item.rating,
        quantity: item.quantity || 1, 
=======
        price: parseFloat(item.price),  
        duration: item.duration,
        lang_tech: item.lang_tech,
        rating: item.rating,
        quantity: item.quantity || 1,  
>>>>>>> 08bb4427f9d230f2ed89d7e4f0d78e0b9741d1aa:src/app/pay-api/checkout/route.js
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
