import { buffer } from "micro";
import clientPromise from "@/lib/mongodb";
import { Webhook } from "svix";

const webhookSecret = process.env.SVIX_WEBHOOK_SECRET;

// Svix headers must be lowercased
const svixHeaders = (headers) => {
  return {
    "svix-id": headers["svix-id"],
    "svix-timestamp": headers["svix-timestamp"],
    "svix-signature": headers["svix-signature"],
  };
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // Parse the raw body for webhook verification
  const buf = await buffer(req);
  const payload = buf.toString("utf-8");
  const headers = svixHeaders(req.headers);

  const wh = new Webhook(webhookSecret);
  let event;

  try {
    // Verify the webhook signature
    event = wh.verify(payload, headers);
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return res.status(400).json({ message: "Webhook verification failed" });
  }

  // Process the event (user created or updated)
  const client = await clientPromise;
  const db = client.db("learnica");
  const usersCollection = db.collection("users");

  try {
    // Ensure unique index on userId
    await usersCollection.createIndex({ userId: 1 }, { unique: true });

    if (event.type === "user.created" || event.type === "user.updated") {
      const user = event.data;
      console.log("User Data:", user);

      // Check if the user has metadata and extract the role
      const userRole = user.public_metadata?.role || "student"; // Default to "student" if role is not provided

      const userData = {
        userId: user.id,
        email: user.email_addresses[0].email_address, // Main email address
        username: user.username,
        createdAt: user.created_at,
        photo: user.image_url,
        firstName: user.first_name,
        lastName: user.last_name,
        role: userRole, // Add the role to the user data
        updatedAt: new Date(),
      };

      // Insert or update the user in MongoDB (upsert)
      await usersCollection.updateOne(
        { userId: user.id },
        { $set: userData },
        { upsert: true }
      );

      res.status(200).json({ message: "User data saved successfully" });
    } else {
      res.status(200).json({ message: "Event received but not processed" });
    }
  } catch (error) {
    console.error("Failed to save user data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
