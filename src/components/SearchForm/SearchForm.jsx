import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchKey } from "../../features/search/searchSlice";

const SearchForm = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const { search } = useSelector((store) => store.search);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault(true);
    dispatch(setSearchKey(searchText));
    if (searchText) {
      navigate("/");
    }
  };
  return (
    <form action="" className="flex w-full">
      <div className="relative w-full">
        <FaSearch className="absolute left-4 top-4 text-slate-400" />
        <input
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          type="search"
          placeholder="Search for something"
          id="service"
          className="placeholder-primary rounded-full rounded-r-none border-[1px] border-primary outline-none shadow-md border-slate-150 p-3 px-10 border-r-1 focus:shadow-backdrop focus:outline-none md:w-[80%] transition-all duration-500"
        />
        <button
          onClick={handleSubmit}
          className={`bg-primary shadow-xl p-3  text-center w-13 text-white outline-none rounded-full rounded-l-none border-[1px] border-primary`}>
          Go
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
