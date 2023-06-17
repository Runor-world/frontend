import React from "react";
import { FaCalendar } from "react-icons/fa";
import { FaClock } from "react-icons/fa";

export const DateTime = ({ dateTime }) => {
  const dateTimeObj = new Date(dateTime);
  return (
    <div className="flex gap-5 py-2 p-5 justify-center">
      <div className="flex gap-3 items-center">
        <FaCalendar className="text-slate-400 text-xl" />
        <small>{dateTimeObj.toLocaleDateString()}</small>
      </div>
      <div className="flex gap-3 items-center">
        <FaClock className="text-slate-400 text-xl" />
        <small>{dateTimeObj.toLocaleTimeString()}</small>
      </div>
    </div>
  );
};
