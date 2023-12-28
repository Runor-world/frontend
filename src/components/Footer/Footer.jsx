import React from "react";
import Brand from "../Brand/Brand";
import { Link } from "react-router-dom";
import { FaEnvelope, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="h-auto bg-black text-white main-x-p main-y-p group flex flex-col gap-3  text-[1.0rem]">
      <section className="flex flex-col text-white lg:flex-row gap-3 justify-between items-start text-left">
        <Brand />
        <article>
          <ul className="list-none px-0">
            <li className="font-bold border-b-4 mb-2 border-b-primary w-full flex-1">
              Client
            </li>
            <li>
              <Link to="/servicemen">Find servicemen</Link>
            </li>
            <li>
              <Link to="/clients">Client of the month</Link>
            </li>
            <li>
              <Link to="/referral">Referral programs</Link>
            </li>
          </ul>
        </article>

        <article>
          <ul className="list-none px-0">
            <li className="font-bold border-b-4 mb-2 border-b-primary flex-1">
              Serviceman
            </li>
            <li>
              <Link to="/jobs">Get jobs</Link>
            </li>
            <li>
              <Link to="/serviceman">Serviceman of the month</Link>
            </li>
            <li>
              <Link to="/pricing">pricing</Link>
            </li>
          </ul>
        </article>
        <article>
          <ul className="list-none px-0">
            <li className="font-bold border-b-4 mb-2 border-b-primary flex-1 w-full">
              Why Runor
            </li>
            <li>
              <Link to="/aboutus">About us</Link>
            </li>
            <li>
              <Link to="/careers">Careers</Link>
            </li>
            <li>
              <Link to="/vision">Our vision</Link>
            </li>
            <li>
              <Link to="/team">Our team</Link>
            </li>
          </ul>
        </article>
        <article>
          <ul className="list-none px-0">
            <li className="font-bold border-b-4 mb-2 border-b-primary flex-1">
              Resources
            </li>
            <li>
              <Link to="/clients-blog">Client blog</Link>
            </li>
            <li>
              <Link to="/servicemen-blog">Service man blog</Link>
            </li>
            <li>
              <Link to="/focus-blog">Focus class</Link>
            </li>
          </ul>
        </article>
      </section>
      <section className="flex justify-start items-center gap-2">
        <p className="font-bold">Contact us</p>
        <FaEnvelope className="text-red-900 text-2xl" />
        <FaFacebook className="text-blue-700 text-2xl" />
      </section>
    </footer>
  );
};

export default Footer;
