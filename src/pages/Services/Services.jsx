import React, { useEffect } from "react";
import ServiceList from "../../components/ServiceList/ServiceList";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading";
import { getServices, openForm } from "../../features/service/serviceSlice";
import ServiceForm from "../../components/ServiceForm/ServiceForm";
import { useGetServicesQuery } from "../../features/api/serviceApi";

const Services = () => {
  const dispatch = useDispatch();
  const { formIsOpened } = useSelector((store) => store.service);

  const { data, isLoading, isFetching, isError, error } = useGetServicesQuery();

  const clickHandler = () => {
    dispatch(openForm());
  };

  if (isLoading && isFetching) {
    return <Loading />;
  }
  return (
    <section className="flex flex-col gap-2">
      <div className="flex justify-between items-cetner">
        <h1 className="text-xl lg:text-xl font-semibold">
          Services ({data?.services.length})
        </h1>
        <button className="btn-primary text-xl" onClick={clickHandler}>
          + New
        </button>
      </div>

      <ServiceList services={data?.services} />
      {formIsOpened && <ServiceForm />}
    </section>
  );
};

export default Services;
