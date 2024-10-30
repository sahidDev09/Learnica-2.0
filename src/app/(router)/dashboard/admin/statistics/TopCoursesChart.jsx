"use client"

import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

function TopCoursesChart({chartData}) {
  const colors = ['#0088FE', '#00C49F', '#FFBB28']
  const data = [
    { name: "today", count: chartData.day1 },
    { name: "1 day ago", count: chartData.day2 },
    { name: "2 days ago", count: chartData.day3 },
  ]
  
  return (
    <div className='p-4 border-2 border-secondary rounded-md bg-card'>
      <h3 className='mb-4 text-xl text-secondary font-semibold'>Recent Order numbers (Courses):</h3>
      <div className='w-full h-[400px]'>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#135276" activeBar={<Rectangle fill="#287aa9" stroke="#135276" />} >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default TopCoursesChart;