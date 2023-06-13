import React from "react";
import PropTypes from "prop-types";
import ServiceCategory from "../ServiceCategory/ServiceCategory";
import CategoryFilterItem from "../CategoryFilterItem/CategoryFilterItem";

const ServiceCategoryList = ({
  services,
  serviceClickHandler,
  selectedServiceName,
  setSelectedServiceName,
}) => {
  return (
    <section className="flex flex-row lg:flex-col gap-2 justify-start lg:items-start items-center overflow-x-auto w-screen lg:w-full h-auto p-2 py-5">
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

export default ServiceCategoryList;
