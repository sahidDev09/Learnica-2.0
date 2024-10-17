import Image from "next/image";
import logo from "/public/assets/learnicaNavlogo.png";

const Footer = () => {
  return (
    <section className="bg-secondary">
      <footer className="footer bg-transparent container mx-auto text-white p-10">
        <aside className=" my-auto">
          <Image src={logo} alt="logo" width={120} height={120} />
          <p>Providing reliable tech since 2024</p>
        </aside>
        <nav>
          <h6 className="footer-title">Top classes</h6>
          <a className="link link-hover">Front-end development</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Digital Marketing</a>
          <a className="link link-hover">Cyber-security</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">All course</a>
          <a className="link link-hover">Helpline</a>
          <a className="link link-hover">Live-class</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
    </section>
  );
};

export default Footer;
