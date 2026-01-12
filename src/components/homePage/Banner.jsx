import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, PlayCircle, Users, BookOpen, GraduationCap } from "lucide-react";

/**
 * Banner component for the Hero section.
 * Redesigned to match the provided student-focused UX.
 */
const Banner = () => {
  return (
    <div className="relative min-h-[85vh] flex items-center overflow-hidden bg-[#fafafa]">
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-orange-50/50 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-green-50/40 rounded-full blur-[80px] -z-10"></div>

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center py-16">
        
        {/* Left Content */}
        <div className="animate-fade-in space-y-8">
          {/* Enrolled Students Badge */}
          <div className="flex items-center gap-3 bg-white p-2 pr-6 rounded-full w-fit shadow-sm border border-slate-100">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-slate-200">
                  <Image 
                    src={`https://i.pravatar.cc/150?u=${i + 10}`} 
                    alt="student" 
                    width={40} 
                    height={40} 
                  />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-white bg-primary flex items-center justify-center text-white text-xs font-bold">
                +
              </div>
            </div>
            <p className="text-sm font-bold text-slate-700">
              <span className="text-primary">302m</span> Enrolled Students
            </p>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
            Stay Curious And <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
              Explore The World
            </span> <br />
            Around You
          </h1>

          <p className="text-lg text-slate-600 max-w-xl leading-relaxed font-medium">
            Enhance your skills through online courses, certifications, and degrees 
            offered by top universities and leading companies.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/onboarding">
              <button className="px-8 py-4 bg-[#FF6B35] text-white font-bold rounded-full hover:scale-105 transition-all shadow-lg shadow-orange-200">
                Join For Free
              </button>
            </Link>
            <Link href="/all-courses">
              <button className="px-8 py-4 bg-white text-slate-800 font-bold rounded-full border-2 border-slate-200 hover:bg-slate-50 transition-all flex items-center gap-2">
                <PlayCircle className="w-5 h-5 text-primary" />
                Find Courses
              </button>
            </Link>
          </div>
        </div>

        {/* Right Content - Visuals */}
        <div className="relative flex justify-center items-center">
          {/* Main Oval Image Container */}
          <div className="relative w-[320px] h-[450px] md:w-[450px] md:h-[580px] rounded-[200px] border-[12px] border-white shadow-2xl overflow-hidden bg-slate-100 group">
             <Image
                src="/hero_student_image.png"
                alt="Student Success"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
             />
             {/* Overlay for depth */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

          {/* Floating Card 1: Online Students */}
          <div className="absolute top-[20%] right-[-5%] md:right-[-10%] bg-white p-4 rounded-2xl shadow-xl border border-slate-50 animate-bounce-slow flex items-center gap-4 z-20">
             <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
             </div>
             <div>
                <h4 className="text-xl font-bold text-slate-800">1236+</h4>
                <p className="text-xs font-semibold text-slate-400">Online Students</p>
             </div>
          </div>

          {/* Floating Card 2: Online Courses */}
          <div className="absolute bottom-[30%] left-[-5%] md:left-[-15%] bg-white p-4 rounded-2xl shadow-xl border border-slate-50 animate-bounce-late flex items-center gap-4 z-20">
             <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary" />
             </div>
             <div>
                <h4 className="text-xl font-bold text-slate-800">800+</h4>
                <p className="text-xs font-semibold text-slate-400">Online Courses</p>
             </div>
          </div>

          {/* Bottom Badge: Admission Complete */}
          <div className="absolute bottom-10 right-10 bg-white p-3 px-6 rounded-full shadow-lg border border-slate-50 flex items-center gap-2 z-20 animate-fade-in-up">
             <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-white" />
             </div>
             <p className="text-sm font-bold text-slate-700 whitespace-nowrap">Your Admission Complete</p>
          </div>

          {/* Background Decorative Icons */}
          <div className="absolute top-10 left-10 opacity-30 animate-pulse text-primary drop-shadow-sm">
            <GraduationCap className="w-12 h-12" />
          </div>
          <div className="absolute bottom-20 right-[-10%] opacity-20 animate-spin-slow text-secondary">
             <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" strokeDasharray="10 10" />
             </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
