"use client"
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';

function UserAmountPieChart({ userTypes }) {
  const userTypesData = [
    { name: 'student', value: userTypes.filter(u => u.role === 'student').length },
    { name: 'teacher', value: userTypes.filter(u => u.role === 'teacher').length },
    { name: 'admin', value: userTypes.filter(u => u.mainRole === 'admin').length },
    { name: 'blocked', value: userTypes.filter(u => u.status === 'blocked').length },
  ]
  
  return (
    <div className='p-4 border-2 border-secondary rounded-md bg-card'>
      <h3 className='mb-4 text-xl text-secondary font-semibold'>User Types:</h3>
      <div className='w-full h-[400px]'>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              dataKey="value"
              isAnimationActive={true}
              data={userTypesData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={50}
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