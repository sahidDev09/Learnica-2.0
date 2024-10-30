import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const { userId, email, title, type, finalAmount, status, lectures } = await request.json();

    if (!userId || !email || !title || !type || !finalAmount || !status || !lectures) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields: userId, email, title, finalAmount, status, lectures',
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
      type,
      finalAmount: parseFloat(finalAmount),
      lectures: lectures.map((lecture) => ({
        title: lecture.title,  
        videoUrl: lecture.videoUrl,  
        price: parseFloat(lecture.price),
        duration: lecture.duration,
        category: lecture.category,   
        rating: lecture.rating,
        quantity: lecture.quantity || 1,
      })),
      createdAt: new Date(),
    };
    console.log('lecture', lectures)

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
