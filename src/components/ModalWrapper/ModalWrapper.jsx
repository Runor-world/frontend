import React from "react";
import PropTypes from "prop-types";
import "./ModalWrapper.css";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { closeModal } from "../../features/modal/modalSlice";

const ModalWrapper = ({ children, width }) => {
  const dispatch = useDispatch();

  return (
    <div className={`w-${width} modal-wrapper`}>
      <div className="">
        <FaTimes
          onClick={() => dispatch(closeModal())}
          className="text-white text-xl absolute -top-10 z-60 right-0"
        />
      </div>
      {children}
    </div>
  );
};

ModalWrapper.propTypes = {
  children: PropTypes.object.isRequired,
  width: PropTypes.string,
};

ModalWrapper.defaultProps = {
  width: "full",
};
export default ModalWrapper;
