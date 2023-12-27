import React, { useEffect } from "react";
import PropTypes from "prop-types";

const CategoryFilterItem = ({
  text,
  onClickHandler,
  extraStyle,
  selectedServiceName,
}) => {
  const handleCLick = () => {
    onClickHandler(text);
  };

  useEffect(() => {
    if (selectedServiceName === "All Services") {
      onClickHandler("All Services");
    }
  }, []);

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
