import Image from "next/image";
import logo from "/public/assets/learnicaNavlogo.png";
import Link from "next/link";
import { BiEnvelope } from "react-icons/bi";
import { LocateIcon, Mail, Map, MapPinHouse } from "lucide-react";

const Footer = () => {
  return (
    <section className="bg-secondary">
      <footer className="footer bg-transparent container mx-auto text-white p-10">
        <aside className=" my-auto">
          <Image src={logo} alt="logo" width={130} height={130} />
          <p>Providing reliable tech since 2024</p>
          <div className=" flex items-center gap-2 ">
            <MapPinHouse className=" h-4 w-4"/>
            <p>Mohammadpur-1200/A, Dhaka, Bangladesh</p>
          </div>
          <a
            href={"mailto:learnicaofficial@gmail.com"}
            className="flex gap-2 items-center bg-primary p-1 rounded-md">
            <Mail className=" h-4 w-4" />
            <p className="">learnicaofficial@gmail.com</p>
          </a>
        </aside>
        <nav>
          <h6 className="footer-title">Top classes</h6>
          <Link href={"/all-courses"} className="link link-hover">
            Front-end development
          </Link>
          <Link href={"/all-courses"} className="link link-hover">
            Design
          </Link>
          <Link href={"/all-courses"} className="link link-hover">
            Digital Marketing
          </Link>
          <Link href={"/all-courses"} className="link link-hover">
            Cyber-security
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <Link href={"/about"} className="link link-hover">
            About us
          </Link>
          <Link href={"/all-courses"} className="link link-hover">
            All course
          </Link>

          <Link href={"/live_class"} className="link link-hover">
            Live-class
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
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
      </footer>
    </section>
  );
};

export default Footer;
