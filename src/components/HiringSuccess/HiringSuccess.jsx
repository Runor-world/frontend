import React from "react";
import { Link } from "react-router-dom";
import { FaCopy, FaEnvelope, FaPhone } from "react-icons/fa";
import { closeModal } from "../../features/modal/modalSlice";
import { useDispatch } from "react-redux";
import { clearMessage } from "../../features/hiring/hiringSlice";
import CopyText from "../CopyText/CopyText";

const HiringSuccess = ({ serviceMan }) => {
  const { lastName, firstName, otherName, phoneNumber } = serviceMan.user;
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(closeModal());
    dispatch(clearMessage());
  };

  return (
    <div className="flex flex-col gap-5 items-center justify-center h-[3/4hv] w-full lg:w-1/3 mx-auto">
      <div className="flex flex-col gap-2 items-center w-full p-2">
        <div className="my-2 text-xl font-semibold">
          <p className="text-primary">Hiring done successfully!</p>
        </div>

        <div className="my-4 flex flex-col items-center justify-center">
          <p>
            You may contact{" "}
            <q>
              {firstName} {lastName ?? otherName}
            </q>{" "}
            via
          </p>

          <ul className="my-2 bg-slate-0 flex flex-col gap-2">
            <CopyText
              text={phoneNumber}
              icon={<FaPhone className="text-primary" />}
            />
          </ul>
        </div>
      </div>
      <Link
        className="btn-primary bg-primary px-4 w-full text-center text-white"
        onClick={handleClick}
        to={"/hiring/user"}>
        Done
      </Link>
    </div>
  );
};

HiringSuccess.propTypes = {};

export default HiringSuccess;
