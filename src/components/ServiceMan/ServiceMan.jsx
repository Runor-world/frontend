import React from "react";
import PropTypes from "prop-types";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setService } from "../../features/hiring/hiringSlice";
import userAvatar from "../../images/user.png";
import { Link } from "react-router-dom";
import { Review } from "../Review/Review";

const ServiceMan = ({ serviceMan }) => {
  const {
    user: { _id: userID, firstName, lastName, otherName, active },
    profile,
    services,
  } = serviceMan;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleHireClick = () => {
    if (services.length === 1) {
      dispatch(setService(services[0]));
      navigate(`/hiring/confirm/${userID}`);
    } else {
      navigate(`/hiring/${userID}`);
    }
  };
  return (
    <Link to={`serviceman/${userID}`}>
      <article className="shadow-lg bg-gradient-to-tl from-slate-300 to-slate-50 flex gap-4 lg:gap-5 flex-wrap lg:flex-nowrap justify-start w-full lg:w-2/3 items-center group hover:scale-[101%] duration-200 transitions-all p-2 lg:p-5 rounded-lg">
        <div className="self-start lg:self-center">
          <img
            src={profile?.photo || userAvatar}
            alt={firstName}
            className="h-20 w-20 lg:w-40 lg:h-40 ring-2 rounded-full ring-slate-400"
          />
        </div>
        <div className="flex flex-col gap-0 shrink-0 flex-1">
          <Link to={`serviceman/${userID}`} className="underline">
            <span className="font-semibold">
              {firstName} {lastName ?? otherName}
            </span>
          </Link>
          <div className="flex gap-2 items-center flex-wrap my-1">
            {services
              .filter((item) => item.active === true)
              .map((service, index) => (
                <div
                  className="flex flex-col gap-2 justify-start items-start"
                  key={index}>
                  <small
                    key={service._id}
                    className="font-semibold text-primary ring-white border-slate-300 rounded-xl ring-2 p-2">
                    {service.name}
                    {services.length - 1 > index ? ", " : ""}
                  </small>
                  <Review
                    ratings={service.averageRating}
                    customers={service.numOfReviews}
                  />
                </div>
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
              } bg-primary text-sm w-full lg:w-2/5`}>
              Hire now
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
};

ServiceMan.propTypes = {
  serviceMan: PropTypes.object.isRequired,
};

export default ServiceMan;
