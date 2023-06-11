import React from "react";
import { Link } from "react-router-dom";
import SignupForm from "../../components/SignupForm/SignupForm";
import loginImage from "../../images/login-bg.jpg";
import logo from "../../images/logo.png";
import Loading from "../../components/Loading/Loading";
import { useSelector } from "react-redux";

const Signup = () => {
  // const { isLoading } = useSelector((store) => store.profile);

  // if (isLoading) return <Loading />;
  return (
    <div className="grid grid-col-1 lg:grid-cols-2 h-screen w-screen overflow-x-clip py-5 lg:py-0">
      <article className="relative items-center text-center invisible lg:visible">
        <img
          src={loginImage}
          alt="bg-poster"
          className="w-full h-full object-cover aspect-square animate-pulse absolute top-0 left-0"
        />
        <div className="bg-black bg-opacity-60 flex flex-col justify-center items-center gap-2 text-white absolute w-full h-full z-10 top-0 left-0 px-5 lg:px-20">
          <Link to="/home">
            <img src={logo} alt="logo" />
          </Link>
          <h2 className="font-bold text-xl lg:text-5xl">Welcome To Runor</h2>
          <p>
            Stressless and do more. Get exceptional assistance when you want it.
            How you want it. The way you want it.
          </p>
        </div>
      </article>

      <article className="flex flex-col items-center justify-center shadow-xl">
        <Link
          to="/home"
          className="cursor-pointer flex gap-2 font-bold items-center text-xl visible lg:hidden px-5 text-primary">
          <img
            src={logo}
            alt="logo"
            className="w-10 h-10 rounded-full ring-primary ring-2"
          />
          <h2>Runor</h2>
        </Link>
        <SignupForm />
      </article>
    </div>
  );
};

export default Signup;
