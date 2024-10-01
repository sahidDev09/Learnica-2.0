import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("learnica");
    const courseCollection = db.collection("courses");

    switch (req.method) {
      case "GET":
        // For paginated listing and other cases
        const { category, page = 1, size = 3, search = "" } = req.query;
        const parsedPage = parseInt(page, 10);
        const parsedSize = parseInt(size, 10);
        const skip = (parsedPage - 1) * parsedSize;
        const limit = parsedSize;
        let filter = {};

        // Filter by category if provided
        if (category) {
          filter.category = category;
        }

        // Filter by search term in title or description
        if (search) {
          filter.$or = [
            { title: { $regex: search, $options: "i" } }, // Case-insensitive regex
            { description: { $regex: search, $options: "i" } },
          ];
        }

        try {
          const totalCourses = await courseCollection.countDocuments(filter); // Total courses
          const courses = await courseCollection
            .find(filter)
            .skip(skip)
            .limit(limit)
            .toArray(); // Get paginated courses

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
        res.status(405).json({ message: "Method Not Allowed" });
        return;
    }
  } catch (error) {
    console.error("Connection or server error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
