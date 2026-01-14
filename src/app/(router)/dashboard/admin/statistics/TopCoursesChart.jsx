"use client"

import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

function TopCoursesChart({chartData}) {
  const colors = ['#135276', '#1a6a94', '#2180b3']
  const data = [
    { name: "Today", count: chartData.day1 },
    { name: "Yesterday", count: chartData.day2 },
    { name: "2 Days Ago", count: chartData.day3 },
  ]

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/95 backdrop-blur-md px-4 py-3 rounded-lg border border-white/10 shadow-xl">
          <p className="text-white font-semibold mb-1">{label}</p>
          <p className="text-blue-300 text-sm">{payload[0].value} orders</p>
        </div>
      );
    }
    return null;
  };

  const CustomBar = (props) => {
    const { fill, x, y, width, height } = props;
    return (
      <g>
        <defs>
          <linearGradient id={`gradient-${x}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={fill} stopOpacity={1}/>
            <stop offset="100%" stopColor={fill} stopOpacity={0.6}/>
          </linearGradient>
        </defs>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={`url(#gradient-${x})`}
          rx={8}
          className="hover:opacity-80 transition-opacity duration-300"
        />
      </g>
    );
  };
  
  return (
    <div className='group p-6 rounded-2xl shadow-lg relative overflow-hidden
                    bg-gradient-to-br from-slate-800 via-slate-900 to-gray-900
                    border border-white/10 backdrop-blur-sm
                    hover:shadow-2xl transition-all duration-500
                    animate-[fadeInUp_0.8s_ease-out_0.2s_both]'>
      <div className="absolute inset-0 bg-gradient-to-br from-[#135276]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#135276]/10 rounded-full blur-3xl"></div>
      
      <h3 className='mb-6 text-2xl text-white font-bold relative z-10 flex items-center gap-3'>
        <span className="w-1 h-8 bg-gradient-to-b from-[#135276] to-blue-400 rounded-full"></span>
        Recent Course Orders
      </h3>
      
      <div className='w-full h-[400px] relative z-10'>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="name" 
              stroke="#94a3b8"
              style={{ fontSize: '14px', fontWeight: '500' }}
            />
            <YAxis 
              stroke="#94a3b8"
              style={{ fontSize: '14px', fontWeight: '500' }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(19, 82, 118, 0.1)' }} />
            <Legend 
              wrapperStyle={{
                paddingTop: '20px',
                fontSize: '14px',
                fontWeight: '500'
              }}
            />
            <Bar 
              dataKey="count" 
              fill="#135276" 
              shape={<CustomBar />}
              animationBegin={0}
              animationDuration={1500}
              animationEasing="ease-out"
              radius={[8, 8, 0, 0]}
            >
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