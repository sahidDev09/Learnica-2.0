function StatCard1({ data, title }) {
  return (  
    <div className="min-w-56 px-4 py-6 border-2 rounded-md shadow-md text-center bg-blue-400 hover:bg-blue-500 hover:scale-105 transition-transform duration-200 ease-in-out">
      <span className="text-4xl font-bold text-white block">{data}</span>
      <span className="text-sm text-gray-100">{title}</span>
    </div>
  );
}

function StatCard2({ data, title }) {
  return (  
    <div className="min-w-56 px-4 py-6 border-2 rounded-md shadow-md text-center bg-green-400 hover:bg-green-500 hover:scale-105 transition-transform duration-200 ease-in-out">
      <span className="text-4xl font-bold text-white block">{data}</span>
      <span className="text-sm text-gray-100">{title}</span>
    </div>
  );
}

function StatCard3({ data, title }) {
  return (  
    <div className="min-w-56 px-4 py-6 border-2 rounded-md shadow-md text-center bg-yellow-400 hover:bg-yellow-500 hover:scale-105 transition-transform duration-200 ease-in-out">
      <span className="text-4xl font-bold text-gray-800 block">{data}</span>
      <span className="text-sm text-gray-700">{title}</span>
    </div>
  );
}

function StatCard4({ data, title }) {
  return (  
    <div className="min-w-56 px-4 py-6 border-2 rounded-md shadow-md text-center bg-red-400 hover:bg-red-500 hover:scale-105 transition-transform duration-200 ease-in-out">
      <span className="text-4xl font-bold text-white block">{data}</span>
      <span className="text-sm text-gray-100">{title}</span>
    </div>
  );
}

function StatCard5({ data, title }) {
  return (  
    <div className="min-w-56 px-4 py-6 border-2 rounded-md shadow-md text-center bg-purple-500 hover:bg-purple-600 hover:scale-105 transition-transform duration-200 ease-in-out">
      <span className="text-4xl font-bold text-white block">{data}</span>
      <span className="text-sm text-gray-100">{title}</span>
    </div>
  );
}

export { StatCard1, StatCard2, StatCard3, StatCard4, StatCard5 };
