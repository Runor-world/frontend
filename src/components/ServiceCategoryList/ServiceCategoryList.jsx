import React, { memo } from "react";
import PropTypes from "prop-types";
import CategoryFilterItem from "../CategoryFilterItem/CategoryFilterItem";
import "./ServiceCategoryList.css";

const ServiceCategoryList = ({
  services,
  serviceClickHandler,
  selectedServiceName,
  setSelectedServiceName,
}) => {
  return (
    <section className="flex flex-row lg:flex-col gap-2 justify-start lg:items-start items-center overflow-x-auto w-screen lg:w-full md:h-[50vh] p-2 py-5 bg-slate-100 rounded-md">
      <CategoryFilterItem
        text={"All Services"}
        key={"All services"}
        extraStyle="bg-slate-100 text-slate-600 border-2 border-primary my-0 underline"
        onClickHandler={serviceClickHandler}
        selectedServiceName={selectedServiceName}
        setSelectedServiceName={setSelectedServiceName}
      />

      {services.map((service) => (
        <CategoryFilterItem
          text={service.name}
          key={service._id}
          extraStyle="bg-slate-100 text-slate-600 border-2 border-primary my-0 underline"
          onClickHandler={serviceClickHandler}
          selectedServiceName={selectedServiceName}
          setSelectedServiceName={setSelectedServiceName}
        />
      ))}
    </section>
  );
};

ServiceCategoryList.propTypes = {
  services: PropTypes.array.isRequired,
};

ServiceCategoryList.defaultProps = {
  services: [],
};

export default memo(ServiceCategoryList);
