import React from "react";
import { useDispatch } from "react-redux";
import { openUserModal, setSelectedUser } from "../../features/user/userSlice";

const UserListItem = ({
  _id,
  firstName,
  lastName,
  active,
  role,
  profile,
  email,
}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      setSelectedUser({ _id, firstName, lastName, active, role, profile })
    );
    dispatch(openUserModal());
  };
  return (
    <article className="flex gap-4 lg:gap-5 flex-wrap lg:flex-nowrap justify-start w-full lg:w-1/3 items-center group hover:scale-[101%] bg-slate-100 duration-200 transitions-all border-b-2 p-2 rounded-lg">
      <div className="self-start">
        <img
          src={profile?.photo}
          alt={firstName}
          className="h-12 w-12 lg:w-20 lg:h-20 ring-2 rounded-full ring-slate-400"
        />
      </div>
      <div className="flex flex-col gap-0 shrink-0 flex-1">
        <span className="font-semibold">
          {firstName} {lastName}
        </span>
        <small className="text-slate-500">
          {role}
          <span
            className={`${
              active ? "text-green-900" : "text-red-900"
            } font-medium`}>
            ({active ? "active" : "suspended"})
          </span>
        </small>
        <small>{email}</small>
        <div className="mt-4 w-full flex gap-2">
          {/* <p className='bg-white rounded-lg p-1 px-2'>{ `${active? 'active': 'suspended'}`}</p> */}
          <button
            onClick={handleClick}
            disabled={role === "admin"}
            className={` ${
              role === "admin"
                ? "btn-dark px-4 line-through"
                : "btn-dark group-hover:bg-primary"
            }  text-sm w-full`}>
            {active ? "Suspend" : "Activate"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default UserListItem;
