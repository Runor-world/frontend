import React from "react";
import { FaStar } from "react-icons/fa";
import "./Stars.css";

const Stars = ({ stars }) => {
  const starsList = [1, 2, 3, 4, 5].map((star, index) => {
    if (index < stars) {
      return (
        <FaStar className="text-xl font-extrabold text-primary" key={index} />
      );
    } else {
      return (
        <FaStar className="text-xl font-extrabold text-slate-600" key={index} />
      );
    }
  });
  return (
    <article className="flex gap-2 items-center justify-center">
      {starsList}
    </article>
  );
};

export default Stars;
