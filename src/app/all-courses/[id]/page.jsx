import React from "react";

const page = ({ params }) => {
  console.log(params.id);

  return <div className="min-h-screen">details page</div>;
};

export default page;
