import React, { useEffect } from "react";
import "./UserStatusUpdateModal.css";
import { useDispatch, useSelector } from "react-redux";
import { closeUserModal } from "../../features/user/userSlice";
import FormError from "../FormError/FormError";
import { useUpdateUserStatusMutation } from "../../features/api/userApi";

const UserStatusUpdateModal = () => {
  let timer = null;

  // clear timer on dismount
  useEffect(() => {
    return () => clearTimeout(timer);
  }, []);

  const [updateUserStatus] = useUpdateUserStatusMutation();
  const { selectedUser, message, isLoading } = useSelector(
    (store) => store.users
  );
  const { active, role, lastName, firstName, profile, _id } = selectedUser;
  const dispatch = useDispatch();

  const handleYesClick = async () => {
    try {
      await updateUserStatus({ status: !active, userID: _id });
      timer = setTimeout(() => {
        dispatch(closeUserModal());
      }, [2000]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    dispatch(closeUserModal());
  };

  return (
    <div className="status-modal">
      <div className="my-2">
        <h3 className="font-medium">
          Are you sure {`${active ? "suspend" : "activate"} this user? `}{" "}
        </h3>
        <FormError message={message} />
      </div>
      <div className="flex flex-col gap-4 justify-center items-center bg-slate-100 p-4 rounded-md">
        <div>
          <img
            src={profile?.photo}
            alt={firstName}
            className="h-20 w-20 md:w-40 md:h-40 rounded-full ring-2"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-medium">
            {firstName} {lastName} (<span>{role}</span>)
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={handleYesClick}
          className="btn-dark px-5"
          disabled={isLoading}>
          Yes
        </button>
        <button onClick={handleClose} className="btn">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UserStatusUpdateModal;
