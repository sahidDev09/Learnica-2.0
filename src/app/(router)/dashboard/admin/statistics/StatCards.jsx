function StatCards() {
  return (
    <div className="flex gap-6 flex-wrap">
      <div className="min-w-56 px-4 py-6 border-2 border-secondary rounded-md shadow-md text-center">
        <span className="text-4xl font-bold text-secondary block">28</span>
        <span className="text-sm text-gray-600">Courses</span>
      </div>

      <div className="min-w-56 px-4 py-6 border-2 border-secondary rounded-md shadow-md text-center">
        <span className="text-4xl font-bold text-secondary block">09</span>
        <span className="text-sm text-gray-600">Custom Courses</span>
      </div>

      <div className="min-w-56 px-4 py-6 border-2 border-secondary rounded-md shadow-md text-center">
        <span className="text-4xl font-bold text-secondary block">$3000</span>
        <span className="text-sm text-gray-600">Earned</span>
      </div>
    </div>
  );
}

export default StatCards;