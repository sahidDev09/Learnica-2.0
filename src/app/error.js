"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="text-center pt-32 pb-48">
      <h2 className=" lg:mt-60 mt-20 text-center text-red-600 font-bold ">
        Something went wrong page 404!
      </h2>
      <button
        className=" text-sky-600 font-bold text-2xl mb-20"
        onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
