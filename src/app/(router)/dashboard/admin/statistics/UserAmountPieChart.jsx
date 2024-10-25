"use client"
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
  { name: 'Group E', value: 278 },
  { name: 'Group F', value: 189 },
];

function UserAmountPieChart() {
  return (
    <div className='mt-10 '>
      <h3 className='mb-6 text-xl text-secondary font-semibold'>Title:</h3>
      <div className='w-full h-[500px] p-6 border-2 border-secondary rounded-md'>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={40}
              fill="#135276"
              label
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default UserAmountPieChart;