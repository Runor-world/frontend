import React from "react";
import { FaPen } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { openForm } from "../../features/service/serviceSlice";

const Service = ({ _id, name, description, active }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(openForm({ _id, name, description, active }));
  };
  return (
    <tr className="hover:scale-[101%] hover:bg-black hover:text-white bg-slate-50 duration-200 transitions-all border-b-2 border-white">
      <td>{name}</td>
      <td>
        {description.split(" ").length > 5
          ? `${description.split(" ").slice(0, 5).join(" ")}...`
          : description}
      </td>
      <td>{active ? "Yes" : "No"}</td>
      <td className="btn" onClick={handleClick}>
        <FaPen className="hover:scale-105" />
      </td>
    </tr>
  );
};

export default Service;
