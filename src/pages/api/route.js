import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const { userId, email, totalAmount, items, duration } = await request.json();
    if (!userId || !email || !totalAmount || !items || !duration) {
      return NextResponse.json(
        { error: "Missing required fields: userId, email, totalAmount, items, duration" },
        { status: 400 }
      );
    }

    const formattedItems = items.map(item => {
      const { concept_title, concept_url, rating, price, duration } = item;

      if (!concept_title || !concept_url || !rating || !price || !duration) {
        throw new Error("Each item must have concept_title, concept_url, rating, price, and duration.");
      }

      return { concept_title, concept_url, rating, price, duration };
    });

    const client = await clientPromise;
    const db = client.db("Learnica");
    const ordersCollection = db.collection("orders");
    const newOrder = {
      userId,
      email,
      totalAmount,
      items: formattedItems,
      duration,
      createdAt: new Date(),
    };

    await ordersCollection.insertOne(newOrder);

    return NextResponse.json({ message: "Order stored successfully" });
  } catch (error) {
    console.error("Error storing order:", error);
    return NextResponse.json(
      { error: "Internal Server Error: " + error.message },
      { status: 500 }
    );
  }
}
