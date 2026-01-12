import { 
  Palette, 
  Briefcase, 
  Code2, 
  HeartPulse, 
  Megaphone, 
  Activity, 
  Database, 
  Cpu,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

/**
 * Categories component redesigned to match the 'Browse By Top Category' section 
 * in the provided screenshot.
 */
function Categories() {
  const categories = [
    { id: "1", name: "Art & Craft", count: "264+", icon: Palette, color: "bg-orange-50", iconColor: "text-orange-500" },
    { id: "2", name: "Business", count: "367+", icon: Briefcase, color: "bg-blue-50", iconColor: "text-blue-500" },
    { id: "3", name: "Development", count: "232+", icon: Code2, color: "bg-green-50", iconColor: "text-green-500" },
    { id: "4", name: "Life Style", count: "156+", icon: HeartPulse, color: "bg-purple-50", iconColor: "text-purple-500" },
    { id: "5", name: "Marketing", count: "259+", icon: Megaphone, color: "bg-red-50", iconColor: "text-red-500" },
    { id: "6", name: "Health & Fitness", count: "197+", icon: Activity, color: "bg-cyan-50", iconColor: "text-cyan-500" },
    { id: "7", name: "Data Science", count: "312+", icon: Database, color: "bg-indigo-50", iconColor: "text-indigo-500" },
    { id: "8", name: "Technology", count: "283+", icon: Cpu, color: "bg-yellow-50", iconColor: "text-yellow-500" },
  ];

  return (
    <section className="py-24 bg-[#fafafa]">
      <div className="container mx-auto px-6">
        <header className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900">
            Browse By <span className="text-secondary">Top Category</span>
          </h2>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((cat, idx) => (
            <Link
              key={cat.id}
              href={`/all-courses?category=${cat.name}`}
              className="group p-8 bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-6 animate-fade-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className={`p-4 rounded-xl ${cat.color} ${cat.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                <cat.icon className="w-8 h-8" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>
                <p className="text-slate-400 font-semibold text-sm">
                  {cat.count} Courses
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center items-center gap-2 text-slate-500 font-medium animate-fade-in [animation-delay:800ms]">
          <p>We have more category & subcategory.</p>
          <Link href="/all-courses" className="text-primary font-bold hover:underline flex items-center gap-1">
            Browse All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Categories;
