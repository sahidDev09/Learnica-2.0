import React from "react";
import Update from "./Update";
import { useQuery } from "@tanstack/react-query";

const page = ({ params }) => {
  return (
    <div>
      <Update courseParamsId={params.id} />
    </div>
  );
};

export default page;
