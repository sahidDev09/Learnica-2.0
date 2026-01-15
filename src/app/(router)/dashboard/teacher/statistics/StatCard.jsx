"use client"
import { useEffect, useState } from 'react';

function AnimatedCounter({ value, duration = 2000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return count;
}

function StatCard1({ data, title }) {
  return (  
    <div className="group w-full px-6 py-8 rounded-2xl shadow-lg text-center relative overflow-hidden
                    bg-gradient-to-br from-[#135276] via-[#1a6a94] to-[#2180b3]
                    hover:shadow-2xl hover:scale-105 hover:-translate-y-2
                    transition-all duration-500 ease-out
                    border border-white/10 backdrop-blur-sm
                    animate-[fadeInUp_0.6s_ease-out]">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
      <span className="text-5xl font-bold text-white block mb-2 relative z-10 group-hover:scale-110 transition-transform duration-300">
        <AnimatedCounter value={data} />
      </span>
      <span className="text-sm text-blue-100 uppercase tracking-wider font-medium relative z-10">{title}</span>
    </div>
  );
}

function StatCard2({ data, title }) {
  return (  
    <div className="group w-full px-6 py-8 rounded-2xl shadow-lg text-center relative overflow-hidden
                    bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600
                    hover:shadow-2xl hover:scale-105 hover:-translate-y-2
                    transition-all duration-500 ease-out
                    border border-white/10 backdrop-blur-sm
                    animate-[fadeInUp_0.6s_ease-out_0.1s_both]">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
      <span className="text-5xl font-bold text-white block mb-2 relative z-10 group-hover:scale-110 transition-transform duration-300">
        <AnimatedCounter value={data} />
      </span>
      <span className="text-sm text-emerald-100 uppercase tracking-wider font-medium relative z-10">{title}</span>
    </div>
  );
}

function StatCard3({ data, title }) {
  return (  
    <div className="group w-full px-6 py-8 rounded-2xl shadow-lg text-center relative overflow-hidden
                    bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600
                    hover:shadow-2xl hover:scale-105 hover:-translate-y-2
                    transition-all duration-500 ease-out
                    border border-white/10 backdrop-blur-sm
                    animate-[fadeInUp_0.6s_ease-out_0.2s_both]">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
      <span className="text-5xl font-bold text-white block mb-2 relative z-10 group-hover:scale-110 transition-transform duration-300">
        <AnimatedCounter value={data} />
      </span>
      <span className="text-sm text-amber-100 uppercase tracking-wider font-medium relative z-10">{title}</span>
    </div>
  );
}

function StatCard4({ data, title }) {
  return (  
    <div className="group min-w-56 px-6 py-8 rounded-2xl shadow-lg text-center relative overflow-hidden
                    bg-gradient-to-br from-rose-500 via-red-600 to-pink-600
                    hover:shadow-2xl hover:scale-105 hover:-translate-y-2
                    transition-all duration-500 ease-out
                    border border-white/10 backdrop-blur-sm
                    animate-[fadeInUp_0.6s_ease-out_0.3s_both]">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
      <span className="text-5xl font-bold text-white block mb-2 relative z-10 group-hover:scale-110 transition-transform duration-300">
        <AnimatedCounter value={data} />
      </span>
      <span className="text-sm text-rose-100 uppercase tracking-wider font-medium relative z-10">{title}</span>
    </div>
  );
}

function StatCard5({ data, title }) {
  return (  
    <div className="group w-full px-6 py-8 rounded-2xl shadow-lg text-center relative overflow-hidden
                    bg-gradient-to-br from-purple-500 via-violet-600 to-purple-700
                    hover:shadow-2xl hover:scale-105 hover:-translate-y-2
                    transition-all duration-500 ease-out
                    border border-white/10 backdrop-blur-sm
                    animate-[fadeInUp_0.6s_ease-out_0.4s_both]">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
      <span className="text-5xl font-bold text-white block mb-2 relative z-10 group-hover:scale-110 transition-transform duration-300">
        <AnimatedCounter value={data} />
      </span>
      <span className="text-sm text-purple-100 uppercase tracking-wider font-medium relative z-10">{title}</span>
    </div>
  );
}

export { StatCard1, StatCard2, StatCard3, StatCard4, StatCard5 };
