import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";

const layout = ({ children }) => {
  const role = "user";

  return (
    <div className="">
      <div className=" sm:w-72 hidden sm:block fixed">
        <Sidebar />
      </div>
      <div className="sm:ml-72">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default layout;
