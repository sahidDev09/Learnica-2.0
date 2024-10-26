"use client"

import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    amount: 200,
    name: 'Today'
  },
  {
    amount: 160,
    name: '1 day ago'
  },
  {
    amount: 450,
    name: '2 days ago'
  },
]

function TopCoursesChart() {
  return (
    <div className='p-4 border-2 border-secondary rounded-md bg-card'>
      <h3 className='mb-4 text-xl text-secondary font-semibold'>Recent Transactions (courses):</h3>
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
            <Bar dataKey="amount" fill="#135276" activeBar={<Rectangle fill="#287aa9" stroke="#135276" />} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default TopCoursesChart;