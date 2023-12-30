import React from "react";
import { FaSpinner } from "react-icons/fa";

const Fetching = ({ message }) => {
  return (
    <div className="w-full h-[50vh] flex justify-center items-center">
      <div className="flex flex-col items-center gap-4 justify-center">
        <FaSpinner className="text-3xl text-primary animate-spin" />
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Fetching;
