function LightStatCard({data, title}) {
  return (  
    <div className="min-w-56 px-4 py-6 border-2 border-secondary rounded-md shadow-md text-center bg-card">
      <span className="text-4xl font-bold text-secondary block">{data}</span>
      <span className="text-sm text-gray-600">{title}</span>
    </div>
  );
}

function DarkStatCard({data, title}) {
  return (  
    <div className="min-w-56 px-4 py-6 border-2 border-secondary rounded-md shadow-md text-center bg-secondary">
      <span className="text-4xl font-bold text-white block">{data}</span>
      <span className="text-sm text-gray-300">{title}</span>
    </div>
  );
}

export { LightStatCard, DarkStatCard }