"use client"

import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    rating: 3.5,
    name: 'javascript fundamentals for beginners'
  },
  {
    rating: 4,
    name: 'react for beginners with a big project'
  },
  {
    rating: 5,
    name: 'learn mern stack with a project'
  },
  {
    rating: 5,
    name: 'learn mern stack with a project'
  },
  {
    rating: 5,
    name: 'learn mern stack with a project'
  },
  {
    rating: 5,
    name: 'learn mern stack with a project'
  },
]

function TopCoursesChart() {
  return (
    <div className='mt-10 '>
      <h3 className='mb-6 text-xl text-secondary font-semibold'>Top Rated Courses:</h3>
      <div className='w-full h-[500px] p-6 border-2 border-secondary rounded-md'>
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
            <Bar dataKey="rating" fill="#135276" activeBar={<Rectangle fill="#287aa9" stroke="#135276" />} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className='text-[#287aa9]'></p>
    </div>
  );
}

export default TopCoursesChart;