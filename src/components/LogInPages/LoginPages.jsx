import React from "react";
import "./LoginPages.css";
import GirlForLogin from "../../images/girlForLogIn.png";
import Logo from "../../images/logo.png";
import Form from "./Forminput/From";

const LoginPages = () => {
  return (
    <section className="container">
      <div className="loginBoard">
        <div className="h-[630px] w-[500px] relative bg-[#0e5963] rounded-sm">
          <img
            src={GirlForLogin}
            className="h-[630px] w-[500px] object-cover absolute mix-blend-overlay rounded-sm"
            alt=""
          />

          <div className="absolute mt-[170px]">
            <div className="flex flex-row justify-center items-center text-center space-x-2 ">
              <h2 className="text-white text-3xl font-bold items-center">
                Welcome To Runor
              </h2>
              <img src={Logo} alt="runor" className="w-6 h-6" />
            </div>

            <div className="">
              <p className="text-white text-sm tracking-6 leading-6">
                stress less and do more. get exceptional assistance when you
                want it. how you want it. whenever you want it
              </p>
            </div>
          </div>
        </div>

        {/* loginin Details */}
        <div>
          <Form />
        </div>
      </div>
    </section>
  );
};

export default LoginPages;
