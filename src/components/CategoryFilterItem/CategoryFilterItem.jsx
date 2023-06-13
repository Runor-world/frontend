import React from "react";
import PropTypes from "prop-types";
import CardButton from "../CardButton/CardButton";

const CategoryFilterItem = ({
  text,
  onClickHandler,
  extraStyle,
  selectedServiceName,
  setSelectedServiceName,
}) => {
  const handleCLick = () => {
    onClickHandler(text);
  };
  return (
    <div
      className={`whitespace-nowrap shadow-md shadow-slate-400 transition-slow no-underline py-2 px-7 block my-2 text-center bg-primary text-white rounded-full hover:bg-black hover:text-primary ${extraStyle} ${
        text === selectedServiceName
          ? "border-black text-primary font-semibold"
          : ""
      }`}
      onClick={handleCLick}>
      {text}
    </div>
  );
};

CategoryFilterItem.propTypes = {
  text: PropTypes.string.isRequired,
};

export default CategoryFilterItem;
