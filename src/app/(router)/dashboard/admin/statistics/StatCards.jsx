function StatCards({statsData}) {
  return (
    <div className="flex gap-6 flex-wrap">
      <div className="min-w-56 px-4 py-6 border-2 border-secondary rounded-md shadow-md text-center odd:bg-card">
        <span className="text-4xl font-bold text-secondary block">{statsData.totalCourses}</span>
        <span className="text-sm text-gray-600">Courses</span>
      </div>

      <div className="min-w-56 px-4 py-6 border-2 border-secondary rounded-md shadow-md text-center odd:bg-card">
        <span className="text-4xl font-bold text-secondary block">{statsData.totalCustomCourses}</span>
        <span className="text-sm text-gray-600">Custom Topics</span>
      </div>

      <div className="min-w-56 px-4 py-6 border-2 border-secondary rounded-md shadow-md text-center odd:bg-card">
        <span className="text-4xl font-bold text-secondary block">{statsData.totalUsers}</span>
        <span className="text-sm text-gray-600">Total Users</span>
      </div>

      <div className="min-w-56 px-4 py-6 border-2 border-secondary rounded-md shadow-md text-center odd:bg-card">
        <span className="text-4xl font-bold text-secondary block">{statsData.totalQnA}</span>
        <span className="text-sm text-gray-600">Total QnA</span>
      </div>
    </div>
  );
}

export default StatCards;