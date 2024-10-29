import Image from "next/image";
import logo from "/public/assets/learnicaNavlogo.png";
import Link from "next/link";
import { Mail, MapPinHouse } from "lucide-react";

const Footer = () => {
  return (
    <section className="bg-secondary">
      <footer className="container mx-auto p-6 text-white">
        <div className="flex flex-col items-center md:flex-row md:justify-between md:items-start gap-6 text-center md:text-left">
          <aside className="flex flex-col items-center md:items-start gap-4">
            <Image src={logo} alt="Learnica Logo" width={100} height={100} />
            <p className="text-sm md:text-base">Providing reliable tech since 2024</p>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <MapPinHouse className="h-4 w-4" />
              <p className="text-sm md:text-base">Mohammadpur-1200/A, Dhaka, Bangladesh</p>
            </div>
            <a
              href="mailto:learnicaofficial@gmail.com"
              className="flex gap-2 items-center bg-primary p-2 rounded-md mt-2 justify-center md:justify-start">
              <Mail className="h-4 w-4" />
              <p className="text-sm md:text-base">learnicaofficial@gmail.com</p>
            </a>
          </aside>

          <nav className="flex flex-col items-center md:items-start gap-2">
            <h6 className="font-semibold text-lg">Top classes</h6>
            <Link href="/all-courses" className="link link-hover">Front-end development</Link>
            <Link href="/all-courses" className="link link-hover">Design</Link>
            <Link href="/all-courses" className="link link-hover">Digital Marketing</Link>
            <Link href="/all-courses" className="link link-hover">Cyber-security</Link>
          </nav>

          <nav className="flex flex-col items-center md:items-start gap-2">
            <h6 className="font-semibold text-lg">Company</h6>
            <Link href="/about" className="link link-hover">About us</Link>
            <Link href="/all-courses" className="link link-hover">All courses</Link>
            <Link href="/live_class" className="link link-hover">Live-class</Link>
          </nav>

          <nav className="flex flex-col items-center md:items-start gap-2">
            <h6 className="font-semibold text-lg">Legal</h6>
            <a
              href="https://docs.google.com/document/d/1gPHH2G5z_P_IcK9UiN6byFcJT-yZEoKngDCzAKIwEGY/edit?usp=sharing"
              target="_blank"
              className="link link-hover">
              Terms of use
            </a>
            <a
              href="https://docs.google.com/document/d/1TyXu6qEkx2MsTdC41HQMQilZ07FW-BIgtbw_oz0QdyM/edit?usp=sharing"
              target="_blank"
              className="link link-hover">
              Privacy policy
            </a>
            <a
              href="https://docs.google.com/document/d/1EQd0kZkVO86GZB-QAnahDYnFXfEuRbdS0DcCpFqDQXY/edit?usp=sharing"
              target="_blank"
              className="link link-hover">
              Cookie policy
            </a>
          </nav>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
