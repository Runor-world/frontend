import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./DropDown.css";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../features/auth/authSlice";
import { baseUrl } from "../../utils/base_url";
import { FaCaretDown, FaCaretRight, FaTimes } from "react-icons/fa";
import userIcon from "../../images/user.png";
import { useGetAllProfilesQuery } from "../../features/api/profileApi";

const DropDown = ({ items, setIsOpen }) => {
  const [hovered, setHovered] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { data } = useGetAllProfilesQuery();

  const logout = async () => {
    window.open(`${baseUrl}/api/auth/logout`, "_self");
    // window.open('http://localhost:8000/api/auth/logout', '_self')
    document.cookie = null;
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      await dispatch(clearUser());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ul className="drop-down" onMouseLeave={() => setIsOpen(false)}>
      <FaTimes
        className="visible lg:hidden text-xl absolute right-2 top-2"
        onClick={() => setIsOpen(false)}
      />
      <div className="p-2 flex gap-2 items-center">
        <img
          src={data?.personalProfile?.photo ?? userIcon}
          alt="user-icon"
          className="rounded-full w-[50px] h-[40px] shadow-md object-cover"
        />
        <li className="item border-b-2 font-semibold">
          {user.firstName} {user.otherName}
        </li>
      </div>
      {items.map((item, index) => {
        if (item.text.toLowerCase() === "dashboard") {
          if (user.role === "admin") {
            return (
              <li
                key={index}
                className="item"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}>
                <p className="flex gap-2 items-center">
                  {item.text} {hovered ? <FaCaretDown /> : <FaCaretRight />}
                </p>
                {hovered ? (
                  <ul className="flex flex-col  pt-3 list-none pl-4 gap-2">
                    <Link
                      to="/dashboard"
                      className="sub-item"
                      onClick={() => setIsOpen(false)}>
                      Services
                    </Link>
                    <Link
                      to="/dashboard/users"
                      className="sub-item"
                      onClick={() => setIsOpen(false)}>
                      Users
                    </Link>
                    <Link
                      to="/dashboard/hirings"
                      className="sub-item"
                      onClick={() => setIsOpen(false)}>
                      Hirings
                    </Link>
                    <Link
                      to="/dashboard/complains"
                      className="sub-item"
                      onClick={() => setIsOpen(false)}>
                      Complains
                    </Link>
                  </ul>
                ) : null}
              </li>
            );
          }
          return null;
        }
        if (item.url === "/logout") {
          return (
            <li className="item" key={index}>
              <Link onClick={logout}>{item.text}</Link>
            </li>
          );
        } else {
          return (
            <li className="item" key={index}>
              <Link to={item.url}>{item.text}</Link>
            </li>
          );
        }
      })}
    </ul>
  );
};

export default DropDown;
