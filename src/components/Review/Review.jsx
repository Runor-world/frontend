import React from "react";
import Stars from "../Stars/Stars";

export const Review = ({ ratings, customers }) => {
  return (
    <div className="flex justify-start items-center gap-1">
      {/* <small className="font-semibold">{ratings || 0}</small> */}
      <Stars stars={ratings} />
      <small className="text-primary">({customers}) customers</small>
    </div>
  );
};
