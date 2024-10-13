import { MongoClient, ObjectId } from 'mongodb';

let cachedClient = null;
let cachedDb = null;

export default async function handler(req, res) {
  // Check if we have a cached MongoClient
  if (!cachedClient || !cachedDb) {
    cachedClient = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await cachedClient.connect();
    cachedDb = cachedClient.db('learnica');
  }

  const db = cachedDb;
  const collection = db.collection('issues');

  // Handle POST request (Add new issue)
  if (req.method === 'POST') {
    const { selectedOption, issueText, studentName, studentId, studentEmail } = req.body;

    if (!selectedOption || !issueText || !studentName || !studentId || !studentEmail) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      const result = await collection.insertOne({
        selectedOption,
        issueText,
        studentName,
        studentId,
        studentEmail,
        createdAt: new Date(), // Add a timestamp for sorting
      });

      return res.status(201).json({ message: 'Issue submitted successfully', data: result });
    } catch (error) {
      console.error('Error adding issue:', error);
      return res.status(500).json({ message: 'Error adding issue', error: error.message });
    }
  }

  // Handle GET request (Fetch all issues)
  else if (req.method === 'GET') {
    try {
      const issues = await collection.find().sort({ createdAt: -1 }).toArray();
      return res.status(200).json({ message: 'Issues fetched successfully', data: issues });
    } catch (error) {
      console.error('Error fetching issues:', error);
      return res.status(500).json({ message: 'Error fetching issues', error: error.message });
    }
  }

  // Handle DELETE request (Delete a specific issue by ID)
  else if (req.method === 'DELETE') {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: 'Issue ID is required' });
    }

    try {
      const result = await collection.deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Issue not found' });
      }

      return res.status(200).json({ message: 'Issue deleted successfully' });
    } catch (error) {
      console.error('Error deleting issue:', error);
      return res.status(500).json({ message: 'Error deleting issue', error: error.message });
    }
  }

  // If the method is not allowed, return 405
  else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
