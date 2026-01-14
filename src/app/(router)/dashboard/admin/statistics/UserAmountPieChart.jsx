"use client"
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';

function UserAmountPieChart({ userTypes }) {
  const COLORS = ['#135276', '#10b981', '#f59e0b', '#ef4444'];
  const userTypesData = [
    { name: 'Students', value: userTypes.filter(u => u.role === 'student').length },
    { name: 'Teachers', value: userTypes.filter(u => u.role === 'teacher').length },
    { name: 'Admins', value: userTypes.filter(u => u.mainRole === 'admin').length },
    { name: 'Blocked', value: userTypes.filter(u => u.status === 'blocked').length },
  ]  

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/95 backdrop-blur-md px-4 py-3 rounded-lg border border-white/10 shadow-xl">
          <p className="text-white font-semibold">{payload[0].name}</p>
          <p className="text-blue-300 text-sm">{payload[0].value} users</p>
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="font-bold text-sm drop-shadow-lg"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  
  return (
    <div className='group p-6 rounded-2xl shadow-lg relative overflow-hidden
                    bg-gradient-to-br from-slate-800 via-slate-900 to-gray-900
                    border border-white/10 backdrop-blur-sm
                    hover:shadow-2xl transition-all duration-500
                    animate-[fadeInUp_0.8s_ease-out_0.3s_both]'>
      <div className="absolute inset-0 bg-gradient-to-br from-[#135276]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#135276]/10 rounded-full blur-3xl"></div>
      
      <h3 className='mb-6 text-2xl text-white font-bold relative z-10 flex items-center gap-3'>
        <span className="w-1 h-8 bg-gradient-to-b from-[#135276] to-blue-400 rounded-full"></span>
        User Distribution
      </h3>
      
      <div className='w-full h-[400px] relative z-10'>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              {COLORS.map((color, index) => (
                <linearGradient key={`gradient-${index}`} id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={1}/>
                  <stop offset="100%" stopColor={color} stopOpacity={0.7}/>
                </linearGradient>
              ))}
            </defs>
            <Pie
              dataKey="value"
              isAnimationActive={true}
              animationBegin={0}
              animationDuration={1500}
              animationEasing="ease-out"
              data={userTypesData}
              cx="50%"
              cy="50%"
              outerRadius={120}
              innerRadius={70}
              fill="#135276"
              label={renderCustomLabel}
              labelLine={false}
              paddingAngle={2}
            >
              {userTypesData.map((_, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={`url(#gradient-${index})`}
                  className="hover:opacity-80 transition-opacity duration-300 cursor-pointer"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              iconType="circle"
              wrapperStyle={{
                paddingTop: '20px',
                fontSize: '14px',
                fontWeight: '500'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default UserAmountPieChart;