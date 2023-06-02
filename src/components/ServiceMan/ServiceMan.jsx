import React from "react";
import PropTypes from "prop-types";
import { FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getServiceMan } from "../../features/serviceMan/serviceManSlice";
import { setService } from "../../features/hiring/hiringSlice";
import CopyText from "../CopyText/CopyText";

const ServiceMan = ({ serviceMan }) => {
  const {
    _id,
    user: { firstName, lastName, otherName, active, phoneNumber },
    profile,
    services,
  } = serviceMan;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleHireClick = () => {
    if (services.length === 1) {
      dispatch(setService(services[0]));
      navigate(`/hiring/confirm/${_id}`);
    } else {
      dispatch(getServiceMan(_id));
      navigate(`/hiring/${_id}`);
    }
  };
  return (
    <article className="flex gap-4 lg:gap-5 flex-wrap lg:flex-nowrap justify-start w-full items-center group hover:scale-[101%] bg-slate-100 duration-200 transitions-all border-b-2 p-2 rounded-lg">
      <div className="self-start">
        <img
          src={profile.photo}
          alt={firstName}
          className="h-12 w-12 lg:w-20 lg:h-20 ring-2 rounded-full ring-slate-400"
        />
      </div>
      <div className="flex flex-col gap-0 shrink-0 flex-1">
        <span className="font-semibold">
          {firstName} {lastName ?? otherName}
        </span>
        <div className="flex gap-2 items-center flex-wrap my-1">
          {services
            .filter((item) => item.active === true)
            .map((service, index) => (
              <small
                key={service._id}
                className="font-semibold text-primary ring-white border-slate-300 rounded-xl ring-2 p-2">
                {service.name}
                {services.length - 1 > index ? ", " : ""}
              </small>
            ))}
        </div>

        {(profile.location || profile.city || profile.country) && (
          <div className="flex flex-col my-2">
            <p className="flex gap-2 text-md">
              <FaMapMarkerAlt className="text-primary text-xl" />
              {profile.location} {profile.city}, {profile.country}
            </p>
          </div>
        )}

        <div className="mt-4 w-full flex gap-2">
          <button
            disabled={!active}
            onClick={handleHireClick}
            className={` ${
              !active
                ? "btn-dark px-4 line-through"
                : "btn-dark group-hover:bg-slate-900"
            } bg-primary text-sm w-full`}>
            Hire now
          </button>
        </div>
      </div>
    </article>
  );
};

ServiceMan.propTypes = {
  serviceMan: PropTypes.object.isRequired,
};

export default ServiceMan;
