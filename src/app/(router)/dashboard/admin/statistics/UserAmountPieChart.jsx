"use client"
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';

function UserAmountPieChart({ userTypes }) {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const userTypesData = [
    { name: 'student', value: userTypes.filter(u => u.role === 'student').length },
    { name: 'teacher', value: userTypes.filter(u => u.role === 'teacher').length },
    { name: 'admin', value: userTypes.filter(u => u.mainRole === 'admin').length },
    { name: 'blocked', value: userTypes.filter(u => u.status === 'blocked').length },
  ]  
  
  return (
    <div className='p-4 border-2 border-secondary rounded-md bg-secondary text-white'>
      <h3 className='mb-4 text-xl text-white font-semibold'>User Types:</h3>
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
            >
              {userTypesData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default UserAmountPieChart;