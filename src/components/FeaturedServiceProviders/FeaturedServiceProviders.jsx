import React, { useRef, useState } from "react";
import providerImage1 from "../../images/provider1.jpg";
import providerImage2 from "../../images/provider2.jpg";
import providerImage3 from "../../images/provider3.jpg";
import providerImage4 from "../../images/provider4.jpg";
import providerImage5 from "../../images/provider3.jpg";
import FeaturedServiceProvider from "../FeaturedServiceProvider/FeaturedServiceProvider";
import "./FeaturedServiceProviders.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { scrollLeft, scrollRight } from "../../utils/base_url";

const services = [
  {
    id: 1,
    name: "Sally James",
    image: providerImage1,
    rating: 4,
    service: "Web development",
  },
  {
    id: 2,
    name: "Salisu Umar",
    image: providerImage2,
    rating: 5,
    service: "Catering",
  },
  {
    id: 3,
    name: "Harry Fred",
    image: providerImage3,
    rating: 5,
    service: "Photography",
  },
  {
    id: 4,
    name: "Kenneth Olamide",
    image: providerImage4,
    rating: 4,
    service: "Electrical",
  },
  {
    id: 5,
    name: "Mary John",
    image: providerImage5,
    rating: 5,
    service: "Catering",
  },
];

const FeaturedServiceProviders = () => {
  const [fetchedServiceProviders] = useState([]);
  const containerRef = useRef(null);
  return (
    <section className="providers bg-slate-100 main-x-p main-y-p group relative">
      <div className="flex flex-col items-center lg:items-start gap-2">
        <h2 className="text-center lg:text-left text-3xl lg:text-4xl font-extrabold">
          Top service providers
        </h2>
        <hr className="border-8 rounded-lg border-primary w-[50%] lg:w-[23%] lg:my-2 group-hover:w-10 transition-slow" />
      </div>
      <div
        id="providers"
        ref={containerRef}
        className="grid overflow-x-auto overflow-y-clip scroll-smooth gap-2 w-full mt-10 pb-1 grid-flow-col auto-cols-[100%] md:auto-cols-[25%] snap-mandatory snap-x">
        {fetchedServiceProviders.length < 1
          ? services.map((service) => (
              <FeaturedServiceProvider key={service.name} {...service} />
            ))
          : fetchedServiceProviders.map((service) => (
              <FeaturedServiceProvider key={service.name} {...service} />
            ))}
      </div>
      <FaChevronLeft
        className="chevron chevron-left cursor-pointer"
        onClick={() => scrollLeft(containerRef, 200, "providers")}
      />
      <FaChevronRight
        className="chevron chevron-right cursor-pointer"
        onClick={() => scrollRight(containerRef, 200, "providers")}
      />
    </section>
  );
};

export default FeaturedServiceProviders;
