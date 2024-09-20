import React from 'react';

const page = () => {
    return (
        <div className="about-us-container bg-blue-50">
      {/* Hero Section */}
      <section className="hero bg-blue-600 py-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white">About Us</h1>
          <p className="mt-4 text-lg text-blue-200">
            Welcome to <strong>Learnica</strong>, a next-generation platform designed to simplify and enhance the online learning experience for both educators and students.
          </p>
        </div>
      </section>

      {/* Why Learnica Section */}
      <section className="why-learnica bg-white py-10 shadow-lg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-blue-600">Why Learnica?</h2>
          <p className="mt-4 text-gray-700">
            Learnica stands out by offering a personalized and user-friendly course management system. We provide a comprehensive environment where:
          </p>
          <ul className="list-disc list-inside mt-4 text-gray-700 space-y-2">
            <li><strong>Teachers:</strong> Create, update, and manage courses with ease, reaching a wide audience of eager learners.</li>
            <li><strong>Students:</strong> Explore, enroll, and complete courses, with the convenience of secure payments and certifications.</li>
            <li><strong>Administrators:</strong> Manage users, courses, and feedback to ensure a seamless experience.</li>
          </ul>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="how-to-use bg-blue-100 py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-blue-600">How to Use Learnica</h2>
          <p className="mt-4 text-gray-700">
            Whether you are a student, teacher, or admin, Learnica is designed to provide a smooth and efficient experience:
          </p>
          <ul className="list-disc list-inside mt-4 text-gray-700 space-y-2">
            <li><strong>For Students:</strong> Browse through a wide range of courses, enroll with a click, and start learning. Receive certificates upon completion.</li>
            <li><strong>For Teachers:</strong> Create and manage your courses easily, while interacting with students through feedback and reviews.</li>
            <li><strong>For Admins:</strong> Oversee the entire platform, managing users, courses, and ratings.</li>
          </ul>
        </div>
      </section>

      {/* Our Vision Section */}
      <section className="vision bg-white py-10 shadow-lg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-blue-600">Our Vision</h2>
          <p className="mt-4 text-gray-700">
            We aim to revolutionize online education by providing an easy-to-use, community-driven platform where learning is interactive, efficient, and accessible to all.
          </p>
          <p className="mt-4 text-gray-700">
            Our goal is to create a thriving educational ecosystem where students, teachers, and administrators collaborate to foster growth and knowledge.
          </p>
        </div>
      </section>

      {/* Our Achievements Section */}
      <section className="achievements bg-blue-100 py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-blue-600">Our Achievements</h2>
          <p className="mt-4 text-gray-700">
            We’re proud of the positive impact Learnica has made since its launch. Our platform has become a go-to for students and instructors alike, offering a range of features designed to foster educational growth and engagement.
          </p>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer bg-blue-600 py-6 text-white text-center">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} Learnica. All rights reserved.</p>
        </div>
      </footer>
    </div>
    );
};

export default page;