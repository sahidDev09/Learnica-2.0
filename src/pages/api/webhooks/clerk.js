import clientPromise from "@/lib/mongodb";

const webhookSecret = process.env.SVIX_WEBHOOK_SECRET;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const buf = await buffer(req);
  const payload = buf.toString("utf-8");
  const headers = svixHeaders(req.headers);

  const wh = new Webhook(webhookSecret);
  let event;

  try {
    event = wh.verify(payload, headers);
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return res.status(400).json({ message: "Webhook verification failed" });
  }

  const client = await clientPromise;
  const db = client.db("learnica");
  const usersCollection = db.collection("users");

  try {
    if (event.type === "user.created" || event.type === "user.updated") {
      const user = event.data;

      // Extracting role from unsafe metadata
      const role = user?.unsafe_metadata?.role || "student"; // Default to 'student' if no role is provided

      const userData = {
        userId: user.id,
        email: user.email_addresses[0].email_address,
        username: user.username,
        createdAt: user.created_at,
        photo: user.image_url,
        firstName: user.first_name,
        lastName: user.last_name,
        role, // Adding role to the user data
        updatedAt: new Date(),
      };

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
