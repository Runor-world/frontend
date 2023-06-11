import React from "react";
import Brand from "../Brand/Brand";
import NavItems from "../NavItems/NavItems";
import { useSelector, useDispatch } from "react-redux/";
import { FaTimes } from "react-icons/fa";
import { closeSidebar } from "../../features/sidebar/sidebarSlice";
import SocialLinks from "../SocialLinks/SocialLinks";
import userIcon from "../../images/user.png";

const Sidebar = () => {
  const { isOpen } = useSelector((store) => store.sidebar);
  const { user } = useSelector((store) => store.auth);
  const { personalProfile } = useSelector((store) => store.profile);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeSidebar());
  };
  return (
    <aside
      className={`${
        isOpen
          ? "translate-x-0 flex flex-col bg-slate-200 p-5 fixed w-[95%] z-50 bg-opacity-100 top-2 left-2 h-screen"
          : "absolute top-0 -translate-x-[120%]"
      } lg:hidden transition-slow`}>
      <FaTimes
        className="text-3xl p-1 font-bold absolute top-2 right-2"
        onClick={handleClose}
      />

      {user ? (
        <div className="mt-2 flex gap-2 items-center">
          <img
            src={personalProfile?.photo ?? userIcon}
            alt="user-icon"
            className="rounded-full w-[50px] h-[40px] shadow-md object-cover"
          />
          <i>
            Hello, {user.firstName} {user.otherName}
          </i>
        </div>
      ) : null}
      <hr className="border-primary mt-2" />
      <NavItems />
      <SocialLinks />
    </aside>
  );
};

export default Sidebar;
