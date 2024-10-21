import StatCards from "./StatCards";

function Statistics() {
  return (  
    <div className="p-4">
      <header>
        <h2 className="text-secondary text-2xl font-semibold mb-6 mt-6 md:mt-0">My Statistics</h2>
      </header>
      
      <StatCards />
    </div>
  );
}

export default Statistics;