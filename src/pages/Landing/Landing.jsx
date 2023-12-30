import React, { useState } from "react";
import Header from "../../components/Header/Header";
import ServiceCategoryList from "../../components/ServiceCategoryList/ServiceCategoryList";
import MainContentWrapper from "../../components/MainContentWrapper/MainContentWrapper";
import ServiceMan from "../../components/ServiceMan/ServiceMan";
import Footer from "../../components/Footer/Footer";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import Loading from "../../components/Loading/Loading";
import Badge from "../../components/Badge/Badge";
import { useGetServiceMenQuery } from "../../features/api/servicemanApi";
import { useGetServicesQuery } from "../../features/api/serviceApi";
import { useSelector } from "react-redux";
import { ITEM_PER__PAGE } from "../../utils/general";
import Fetching from "../../components/Fetching/Fetching";

function Landing() {
  const { search } = useSelector((store) => store.search);
  const { data, isLoading, isError, error, isFetching } = useGetServiceMenQuery(
    {
      key: "",
      items_per_page: ITEM_PER__PAGE,
      page: 1,
    }
  );

  const { data: servicesData } = useGetServicesQuery();

  const [selectedServiceName, setSelectedServiceName] =
    useState("All Services");
  const [filteredServiceMen, setFilteredServiceMen] = useState([]);

  const handleServiceClick = (serviceName) => {
    setSelectedServiceName(serviceName);
    let filteredbyServiceName = [];
    const activeServiceMen = data?.serviceMen?.filter(
      ({ user }) => user.active && user.phoneNumber
    );
    console.log(data.serviceMen.length);
    // return all services men if "All Services" is clicked on
    if (serviceName !== "All Services") {
      filteredbyServiceName = activeServiceMen?.filter(
        (serviceMan) =>
          serviceMan.services.map((service) => service.name)[0] === serviceName
      );
    } else {
      filteredbyServiceName = activeServiceMen;
    }
    setFilteredServiceMen((prev) => [...filteredbyServiceName]);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isFetching) {
    return <Fetching message={"Fetching result..."} />;
  }

  if (isError)
    return (
      <div className="flex justify-center items-center text-center">
        <p>{error.message}</p>
      </div>
    );

  const serviceMenList = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 w-full">
      {filteredServiceMen?.map((serviceMan, index) => (
        <ServiceMan key={serviceMan?._id + index} serviceMan={serviceMan} />
      ))}
    </div>
  );

  // list of services that are active
  const activeServices = servicesData?.services.filter(
    (service) => service.active
  );

  return (
    <PageWrapper>
      <Header />
      <MainContentWrapper>
        {/* <ServiceSearchBar /> */}
        <section className="grid grid-col lg:grid-cols-5 w-full gap-5 items-start mb-10 ">
          <div className="flex col-span-full lg:col-span-1 flex-col gap-2">
            <Badge text="Services" number={activeServices?.length} />
            <ServiceCategoryList
              services={activeServices}
              serviceClickHandler={handleServiceClick}
              selectedServiceName={selectedServiceName}
              setSelectedServiceName={setSelectedServiceName}
            />
          </div>

          <div className="col-span-full lg:col-span-4 w-full justify-center">
            <Badge
              text={`${selectedServiceName} Service Men`}
              number={filteredServiceMen?.length}
            />
            <div className="flex flex-col gap-4 mt-5 pr-6">
              {filteredServiceMen?.length > 0 ? (
                serviceMenList
              ) : search.key ? (
                <div className="flex justify-center items-center">
                  <p className="text-black">
                    No result matching <q>{search.key}</q>
                  </p>
                </div>
              ) : (
                <div className="flex justify-center items-center">
                  <p className="text-black">No service man yet</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </MainContentWrapper>
      <Footer />
    </PageWrapper>
  );
}

export default Landing;
