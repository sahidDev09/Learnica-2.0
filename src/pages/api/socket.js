import clientPromise from "@/lib/mongodb";
import { Server } from "socket.io";

export default async function handler(req, res) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    const client = await clientPromise;
    const db = client.db("learnica");
    const coursesCollection = db.collection("courses");

    // Listen to MongoDB changes using Change Streams
    const changeStream = coursesCollection.watch();
    changeStream.on("change", (change) => {
      if (change.operationType === "insert") {
        const newCourse = change.fullDocument;
        // Emit a real-time event to all connected clients
        io.emit("courseApproved", newCourse);
      }
    });

    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);
      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });
  }
  res.end();
}
