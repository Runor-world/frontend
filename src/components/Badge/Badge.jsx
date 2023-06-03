import React from "react";
import PropTypes from "prop-types";

const Badge = ({ text, number }) => {
  return (
    <div className="flex gap-1 items-center">
      <h3 className="text-lg font-bold">{text}</h3>
      <div className="flex items-center justify-center ring-2 rounded-full w-5 p-1 h-5 m-2 text-primary font-normal">
        <small className="text-center">{number}</small>
      </div>
    </div>
  );
};

Badge.propTypes = {
  text: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
};

export default Badge;
