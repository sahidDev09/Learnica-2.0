import Image from "next/image";
import logo from "/public/assets/learnicaNavlogo.png";
import Link from "next/link";
import { Mail, MapPinHouse } from "lucide-react";

const Footer = () => {
  return (
    <section className="bg-secondary pt-20 pb-10 border-t border-white/10">
      <footer className="container mx-auto px-6 text-white/80">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <aside className="flex flex-col items-center md:items-start gap-6">
            <Image src={"/assets/learnicaNavlogo.png"} alt="Learnica Logo" width={160} height={40} className="opacity-100" />
            <p className="text-sm leading-relaxed text-center md:text-left">
              Empowering learners worldwide with expert-led courses and state-of-the-art educational tools. Providing reliable tech since 2024.
            </p>
            <div className="space-y-4 w-full">
              <div className="flex items-center gap-3 justify-center md:justify-start group cursor-default">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <MapPinHouse className="h-4 w-4 text-primary" />
                </div>
                <p className="text-sm">Mohammadpur-1200/A, Dhaka, BD</p>
              </div>
              <a
                href="mailto:learnicaofficial@gmail.com"
                className="flex gap-3 items-center group justify-center md:justify-start transition-all hover:translate-x-1">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <p className="text-sm font-medium hover:text-white">learnicaofficial@gmail.com</p>
              </a>
            </div>
          </aside>

          <nav className="flex flex-col items-center md:items-start gap-4">
            <h6 className="font-bold text-white text-lg tracking-wider">Top Classes</h6>
            <div className="flex flex-col gap-3 items-center md:items-start">
              <Link href="/all-courses" className="hover:text-primary transition-colors text-sm">Front-end Development</Link>
              <Link href="/all-courses" className="hover:text-primary transition-colors text-sm">Design & UX</Link>
              <Link href="/all-courses" className="hover:text-primary transition-colors text-sm">Digital Marketing</Link>
              <Link href="/all-courses" className="hover:text-primary transition-colors text-sm">Cyber Security</Link>
            </div>
          </nav>

          <nav className="flex flex-col items-center md:items-start gap-4">
            <h6 className="font-bold text-white text-lg tracking-wider">Company</h6>
            <div className="flex flex-col gap-3 items-center md:items-start">
              <Link href="/about" className="hover:text-primary transition-colors text-sm">About Us</Link>
              <Link href="/all-courses" className="hover:text-primary transition-colors text-sm">All Courses</Link>
              <Link href="/live_class" className="hover:text-primary transition-colors text-sm">Live Classes</Link>
            </div>
          </nav>

          <nav className="flex flex-col items-center md:items-start gap-4">
            <h6 className="font-bold text-white text-lg tracking-wider">Legal</h6>
            <div className="flex flex-col gap-3 items-center md:items-start">
              <a href="#" className="hover:text-primary transition-colors text-sm">Terms of Use</a>
              <a href="#" className="hover:text-primary transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors text-sm">Cookie Policy</a>
            </div>
          </nav>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium uppercase tracking-[0.2em]">
          <p>© 2026 Learnica. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Twitter</a>
            <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-primary transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
