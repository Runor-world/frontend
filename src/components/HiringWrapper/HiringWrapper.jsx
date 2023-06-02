import React from "react";
import PropTypes from "prop-types";

const HiringWrapper = ({ children }) => {
  return (
    <section className="flex flex-col items-center w-full lg:w-2/5 gap-4 jusfity-center m-auto">
      {children}
    </section>
  );
};

HiringWrapper.propTypes = {
  children: PropTypes.array.isRequired,
};

export default HiringWrapper;
