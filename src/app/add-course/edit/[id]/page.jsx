import React from "react";

const page = ({ params }) => {
  return <div className=" container mx-auto my-4">{params.id}</div>;
};

export default page;
