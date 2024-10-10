import { MongoClient, ObjectId } from 'mongodb'; 

// MongoDB connection URI
const uri = process.env.MONGODB_URI; // Store MongoDB URI in environment variables

export default async function handler(req, res) {
  const client = new MongoClient(uri);
  
  // Handle POST request (Add new issue)
  if (req.method === 'POST') {
    const { selectedOption, issueText, studentName, studentId, studentEmail } = req.body;

    if (!selectedOption || !issueText || !studentName || !studentId || !studentEmail ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      await client.connect();
      const db = client.db('learnica');
      const collection = db.collection('issues');

      const result = await collection.insertOne({
        selectedOption,
        issueText,
        studentName, 
        studentId, 
        studentEmail,
        createdAt: new Date(), // Add a timestamp for sorting
      });

      await client.close();

      return res.status(201).json({ message: 'Issue submitted successfully', data: result });
    } catch (error) {
      console.error('Error adding issue:', error);
      return res.status(500).json({ message: 'Error adding issue', error: error.message });
    }
  }

  // Handle GET request (Fetch all issues)
  else if (req.method === 'GET') {
    try {
      await client.connect();
      const db = client.db('learnica');
      const collection = db.collection('issues');

      // Fetch all issues sorted by creation time (newest first)
      const issues = await collection.find().sort({ createdAt: -1 }).toArray();

      await client.close();

      return res.status(200).json({ message: 'Issues fetched successfully', data: issues });
    } catch (error) {
      console.error('Error fetching issues:', error);
      return res.status(500).json({ message: 'Error fetching issues', error: error.message });
    }
  }

  // Handle DELETE request (Delete a specific issue by ID)
  else if (req.method === 'DELETE') {
    const { id } = req.query; // Get the issue ID from the query parameters

    if (!id) {
      return res.status(400).json({ message: 'Issue ID is required' });
    }

    try {
      await client.connect();
      const db = client.db('learnica');
      const collection = db.collection('issues');

      // Delete the issue by its ObjectId
      const result = await collection.deleteOne({ _id: new ObjectId(id) });

      await client.close();

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
