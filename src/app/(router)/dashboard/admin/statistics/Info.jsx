import StatCards from "./StatCards";
import TopCoursesChart from "./TopCoursesChart";
import UserAmountPieChart from "./UserAmountPieChart";

function Info() {
  return (  
    <div>
      <StatCards />
      <div className="grid grid-cols-[6fr_4fr] gap-12">
        <TopCoursesChart />
        <UserAmountPieChart />
      </div>
    </div>
  );
}

export default Info;