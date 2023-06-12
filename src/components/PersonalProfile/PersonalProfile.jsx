import React from "react";
import "./PersonalProfile.css";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { openModal } from "../../features/modal/modalSlice";
import { getTodayFormatedDate, toISODate } from "../../utils/date";

const PersonalProfile = ({ personalProfile, user, setOpen }) => {
  // if user is new use this default profile
  // const personalProfile = {
  //   ...pProfile,
  //   birthday: toISODate(pProfile?.birthday),
  // } ?? {
  //   bio: "my beatiful bio",
  //   birthday: getTodayFormatedDate(),
  //   city: "my city",
  //   country: "my country",
  // };
  const dispatch = useDispatch();

  return (
    <section className="wrapper text-left">
      <div className="flex gap-2 items-center justify-center">
        <h2 className="font-bold text-center">Personal profile</h2>

        <FaEdit onClick={() => setOpen(true)} className="profile-link-round " />
      </div>
      <article>
        <small className="text-primary">First name</small>
        <hr />
        <p>{user.firstName}</p>
      </article>
      <article>
        <small className="text-primary">Other name</small>
        <hr />
        <p>{user.otherName}</p>
      </article>
      <article>
        <small className="text-primary">Email</small>
        <hr />
        <p>{user.email}</p>
      </article>
      <article>
        <div className="flex justify-between items-center">
          <small className="text-primary">Phone number</small>
          <FaEdit
            className="text-primary cursor-pointer"
            onClick={() => dispatch(openModal())}
          />
        </div>
        <hr />
        {user.phoneNumber ? (
          <>
            <p>{user.phoneNumber}</p>
          </>
        ) : (
          <button
            className="btn-dark bg-primary mt-1 outline-none"
            onClick={() => dispatch(openModal())}>
            Add phone number
          </button>
        )}
      </article>
      <article>
        <small className="text-primary">Location</small>
        <hr />
        <p>{user.location ?? "your address"}</p>
      </article>
      <>
        <article>
          <small className="text-primary">City</small>
          <hr />
          <p>{personalProfile?.city ?? "my city"}</p>
        </article>
        <article>
          <small className="text-primary">Country</small>
          <hr />
          <p>{personalProfile?.country ?? "my country"}</p>
        </article>
        <article>
          <small className="text-primary">Birthday</small>
          <hr />
          <p>
            {toISODate(personalProfile?.birthday) ?? getTodayFormatedDate()}
          </p>
        </article>
        <article>
          <small className="text-primary">Bio</small>
          <hr />
          <p>{personalProfile?.bio ?? "my bio"}</p>
        </article>
      </>
    </section>
  );
};

export default PersonalProfile;
