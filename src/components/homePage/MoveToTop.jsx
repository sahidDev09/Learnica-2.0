import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

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
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="bg-gray-500 opacity-80 hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-800 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center sm:py-3 sm:px-6 sm:text-lg transition duration-300"
        >
          
          Move to top <FaArrowUp className="ml-2" />
        </button>
      )}
    </div>
  );
};

export default MoveToTop;
