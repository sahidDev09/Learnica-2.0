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

  const client = await clientPromise;
  const db = client.db("learnica");
  const usersCollection = db.collection("users");

  try {
    await usersCollection.createIndex({ email: 1 }, { unique: true });

    if (event.type === "user.created" || event.type === "user.updated") {
      const user = event.data;

      const userRole =
        user?.unsafe_metadata?.role || user?.unsafeMetadata?.role;

      const userData = {
        userId: user.id,
        email: user.email_addresses[0].email_address,
        username: user.username,
        createdAt: user.created_at,
        photo: user.image_url,
        firstName: user.first_name,
        lastName: user.last_name,
        role: userRole,
        updatedAt: new Date(),
      };

      const existingUser = await usersCollection.findOne({
        email: userData.email,
      });

      if (existingUser && existingUser.userId !== userData.userId) {
        return res.status(400).json({
          message: "A user with this email already exists.",
        });
      }

      // Insert MongoDB
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

    if (error.code === 11000) {
      // Handle unique constraint violation for email
      res
        .status(400)
        .json({ message: "A user with this email already exists." });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
