import { MongoClient } from 'mongodb';

// MongoDB connection URI
const uri = process.env.MONGODB_URI; // Store MongoDB URI in environment variables

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { thumbnail, courseName, category, authorName, authorId, authorEmail, liveLink, liveTime } = req.body;

    if (!thumbnail || !courseName || !category || !authorName || !authorId || !authorEmail || !liveLink || !liveTime) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      // Connect to MongoDB
      const client = new MongoClient(uri);
      await client.connect();
      const db = client.db('learnica'); // Replace with your database name
      const collection = db.collection('live_classes'); // Replace with your collection name

      // Insert class data into MongoDB
      const result = await collection.insertOne({
        thumbnail,
        courseName,
        category,
        authorName,
        authorId,
        authorEmail,
        liveLink,
        liveTime,
       
      });

      // Close the connection
      await client.close();

      // Return success response
      return res.status(201).json({ message: 'Live class added successfully', data: result });
    } catch (error) {
      console.error('Error adding class:', error);
      return res.status(500).json({ message: 'Error adding class', error: error.message });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
