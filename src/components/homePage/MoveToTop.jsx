import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa'; // Import the arrow-up icon from react-icons

const MoveToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show the button when the user scrolls down 100px
  const toggleVisibility = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center"
        >
          <FaArrowUp className="mr-2" /> {/* This is the upward arrow icon */}
          Move to Top
        </button>
      )}
    </div>
  );
};

export default MoveToTop;
