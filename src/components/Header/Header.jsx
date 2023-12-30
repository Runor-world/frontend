import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import NavBar from "../NavBar/NavBar";
import Brand from "../Brand/Brand";
import { FaBars } from "react-icons/fa";
import { openSidebar } from "../../features/sidebar/sidebarSlice";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();

  return (
    <header
      className={`flex justify-between items-center main-x-p py-2 w-screen fixed top-0 left-0 bg-white z-50 shadow-sm shadow-slate-300 bg-opacity-100 text-primary`}>
      <div className="flex gap-4 items-center">
        <FaBars
          className="text-xl text-primary lg:hidden visible"
          onClick={() => dispatch(openSidebar())}
        />
        <Brand />
      </div>
      <div className="lg:flex flex-1 ml-7 absolute top-20 left-5 md:relative md:top-0 md:left-3">
        <SearchForm />
      </div>

      <div className="">
        <NavBar />
      </div>
    </header>
  );
};

export default Header;
