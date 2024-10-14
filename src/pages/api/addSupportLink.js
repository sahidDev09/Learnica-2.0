import { MongoClient } from 'mongodb';

let cachedClient = null;
let cachedDb = null;

export default async function handler(req, res) {
  // Check if the cached client and db are available
  if (!cachedClient || !cachedDb) {
    cachedClient = new MongoClient(process.env.MONGODB_URI); // No options needed
    await cachedClient.connect();
    cachedDb = cachedClient.db('learnica');
  }

  const db = cachedDb;
  const collection = db.collection('supportLink');

  // Handle POST request (Add new instructor)
  if (req.method === 'POST') {
    const { instructorName, meetLink } = req.body;

    if (!instructorName || !meetLink) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      // Check if any record already exists
      const existingData = await collection.findOne({});
      if (existingData) {
        return res.status(400).json({ message: 'A help line link already exists. Please remove it before adding a new one.' });
      }

      const result = await collection.insertOne({
        instructorName,
        meetLink,
        createdAt: new Date(),
      });

      // Return the inserted instructor data
      return res.status(201).json({
        message: 'Instructor added successfully',
        data: {
          _id: result.insertedId,
          instructorName,
          meetLink,
          createdAt: new Date(),
        },
      });
    } catch (error) {
      console.error('Error adding instructor:', error);
      return res.status(500).json({ message: 'Data fetching error', error: error.message });
    }
  }

  // Handle GET request (Fetch all instructors)
  else if (req.method === 'GET') {
    try {
      const instructors = await collection.find().sort({ createdAt: -1 }).toArray();
      return res.status(200).json({ message: 'Fetched successfully', data: instructors });
    } catch (error) {
      console.error('Error fetching instructors:', error);
      return res.status(500).json({ message: 'Error fetching instructors', error: error.message });
    }
  }

  // Handle DELETE request (Remove the current instructor)
  else if (req.method === 'DELETE') {
    try {
      // Delete the first instructor found (you may change this to a specific ID if needed)
      const result = await collection.deleteOne({}); // Consider passing a specific condition
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'No instructor found to delete' });
      }

      return res.status(200).json({ message: 'Instructor deleted successfully' });
    } catch (error) {
      console.error('Error deleting instructor:', error);
      return res.status(500).json({ message: 'Error deleting instructor', error: error.message });
    }
  }

  // If the method is not allowed
  else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
