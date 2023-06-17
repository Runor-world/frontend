import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Error = ({ error }) => {
  return (
    <div lassName="flex  flex-col justify-center h-screen items-center text-center">
      <p>{error}</p>
      <Link className="btn-dark" to={"/"}>
        Go Home
      </Link>
    </div>
  );
};

Error.propTypes = { error: PropTypes.string.isRequired };

export default Error;
