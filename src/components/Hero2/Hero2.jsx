import React, { useState } from "react";
import { Link } from "react-router-dom";
import heroImage from "../../images/hero-photo.jpg";

const Hero = () => {
  const [zIndex, setZindex] = useState([10, 20]);

  return (
    <div className="relative w-full h-screen">
      <img src={heroImage} className="h-full w-full object-cover" />
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 text-white flex flex-col justify-center">
        <section className="grid grid-cols-1 lg:grid-cols-2 main-x-p h-full gap-10 relative content-center">
          <div className="flex flex-col lg:pt-5 justify-start item-center lg:items-start text-center lg:text-left">
            <h1 className="text-white text-4xl lg:text-7xl font-extrabold animate-bounce">
              Hire the world
            </h1>
            <h2 className="text-slate-200 text-xl lg:text-3xl font-bold">
              Whenever you are ready
            </h2>
            <p className="my-5 lg:my-10 lg:w-[80%]">
              Hire helpers, get assistance, save time and pay as you go on the
              journey of hiring the world
            </p>
            <Link
              to="/"
              className="shadow-md shadow-slate-400 hover:scale-105 transition-slow no-underline py-1 md:py-2 px-7 text-center mx-auto lg:mx-0 w-1/2 bg-primary font-bold text-white rounded-full hover:bg-black hover:text-primary">
              Get Started
            </Link>
          </div>
          <div className="w-full h-full relative">
            <img
              src={heroImage}
              alt="hero-show"
              className={`h-[200px] lg:h-full w-full mx-auto object-cover aspect-auto ring-1 ring-primary scale-110 absolute transition-all duration-200 z-${zIndex[0]}`}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Hero;
