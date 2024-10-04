import Image from 'next/image'; 
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';

const getClasses = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/live_classes"); 
  const classes = await res.json();
  return classes;
};

const LiveClasses = async () => {
  const classes = await getClasses();

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Live Classes</h1>

      {/* Add Courses Button */}
      <div className="flex justify-end mt-4 mb-4">
        <Link href="liveClassAdd">
          <button className="text-sm flex items-center gap-2 p-2 px-4 text-white bg-primary rounded-xl hover:scale-105 transition-transform md:text-lg">
            <FaPlus />
            Add Live Class
          </button>
        </Link>
      </div>

      {/* Responsive Grid Layout */}
      <div className="grid lg:grid-cols-2 gap-6 ml-16 mr-16">
        {classes.map((liveClass, index) => (
          <div 
            key={index} 
            className="flex flex-col md:flex-row gap-6 bg-card rounded-lg shadow-md p-4  duration-300 hover:shadow-[0_30px_18px_-8px_rgba(0,0,0,0.1)] hover:scale-105 transition-transform h-full"
          >
            {/* Image */}
            <div className="md:w-1/2 h-full">
              <Image
                src={liveClass.thumbnail}
                alt="Course Thumbnail"
                width={256}
                height={144}
                className="w-60 rounded-lg h-full object-cover"
              />
            </div>

            {/* Information */}
            <div className="md:w-1/2 flex flex-col justify-between h-full">
              <div className="flex-1">
                <h3 className="text-lg font-bold mt-2 md:mt-0 text-fuchsia-800">{liveClass.courseName}</h3>
                <p className="text-sm font-bold"><span className=' text-red-600'>Category:</span> <span>{liveClass.category}</span></p>
                <p className="text-sm font-bold"><span className=' text-rose-800'>Author:</span> <span>{liveClass.authorName}</span></p>
                <p className="text-sm font-bold"><span className=' text-red-500'>Live Time:</span> <span>{liveClass.liveTime}</span></p>
              </div>
              
              {/* Button, aligned right */}
              <div className="mt-4 md:mt-0 md:flex md:justify-end flex justify-end">
                <Link href={liveClass.liveLink}>
                  <button className="bg-primary text-white rounded-md px-3 py-2 hover:bg-orange-700 transition">
                    Join Live Class
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveClasses;
