import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("learnica");
    const classesCollection = db.collection("concepts");

    const { lang_tech, page = 1, size = 15 } = req.query;
    let filter = {};

    if (lang_tech) {
      const escapedLangTech = lang_tech.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"); 
      filter = { lang_tech: { $regex: new RegExp(`^${escapedLangTech}$`, "i") } };
    }

    const pageNumber = parseInt(page, 10);
    const sizeNumber = parseInt(size, 10);
    const skip = (pageNumber - 1) * sizeNumber;
    
    const totalItems = await classesCollection.countDocuments(filter);
    const classes = await classesCollection
      .find(filter)
      .skip(skip)
      .limit(sizeNumber)
      .toArray();

    let categories = await classesCollection.distinct("lang_tech");
    categories = categories.sort((a, b) => {
      if (a === "JavaScript") return -1;
      if (b === "JavaScript") return 1;
      return 0;
    });

    res.status(200).json({
      totalItems, 
      pageNumber, 
      sizeNumber, 
      classes, 
      categories,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
