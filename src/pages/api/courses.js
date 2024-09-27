import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("learnica");
  const courseCollection = db.collection("courses");

  switch (req.method) {
    case "GET":
      const { category, page = 1, size = 3, search = "" } = req.query;
      const parsedPage = parseInt(page);
      const parsedSize = parseInt(size);
      const skip = (parsedPage - 1) * parsedSize;
      const limit = parsedSize;
      let filter = {};

      if (category) {
        filter.category = category; // Filter by category if provided
      }

      if (search) {
        filter.$or = [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ];
      }

      try {
        const totalCourses = await courseCollection.countDocuments(filter); 
        const courses = await courseCollection.find(filter).skip(skip).limit(limit).toArray(); 

        // Fetch unique categories
        const uniqueCategories = await courseCollection.distinct("category");

        res.status(200).json({
          products: courses,
          totalProducts: totalCourses,
          categories: uniqueCategories,
        });
      } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
      break;

    
    default:
      res.status(405).end(); 
      break;
  }
}
