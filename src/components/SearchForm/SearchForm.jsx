import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SearchForm = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(true);
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
          className="placeholder-primary rounded-full rounded-r-none w-100 border-[1px] border-primary outline-none shadow-md border-slate-150 p-3 px-10 border-r-1 focus:shadow-backdrop focus:outline-none focus:w-full md:focus:w-[80%] transition-all duration-500"
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
