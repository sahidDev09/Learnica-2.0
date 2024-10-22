import React from "react";
import { Button } from "../ui/button";

const CommonFrom = ({ handleSubmit, buttonText }) => {
  return (
    <form onSubmit={handleSubmit}>
      {/* render form control here */}

      <Button type="submit">{buttonText || "Submit"}</Button>
    </form>
  );
};

export default CommonFrom;
