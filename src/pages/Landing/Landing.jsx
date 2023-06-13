import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import ServiceSearchBar from "../../components/ServiceSearchBar/ServiceSearchBar";
import ServiceCategoryList from "../../components/ServiceCategoryList/ServiceCategoryList";
import MainContentWrapper from "../../components/MainContentWrapper/MainContentWrapper";
import ServiceMan from "../../components/ServiceMan/ServiceMan";
import Footer from "../../components/Footer/Footer";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import Loading from "../../components/Loading/Loading";
import Badge from "../../components/Badge/Badge";
import { useGetServiceMenQuery } from "../../features/api/servicemanApi";
import { useGetServicesQuery } from "../../features/api/serviceApi";

function Landing() {
  const { data, isLoading, isFetching, isError, error } =
    useGetServiceMenQuery();
  const { data: servicesData } = useGetServicesQuery();

  const [selectedServiceName, setSelectedServiceName] =
    useState("All Services");

  const activeServiceMen = data?.serviceMen?.filter(
    ({ user }) => user.active && user.phoneNumber
  );
  const [filteredServiceMen, setFilteredServiceMen] = useState([]);

  const handleServiceClick = (serviceName) => {
    setSelectedServiceName(serviceName);
    let filteredbyServiceName = [];
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

  if (isLoading && isFetching && data === undefined) {
    return <Loading />;
  }

  if (isError)
    return (
      <div className="flex justify-center items-center text-center">
        <p>{error}</p>
      </div>
    );

  const serviceMenList = filteredServiceMen?.map((serviceMan, index) => (
    <ServiceMan key={serviceMan?.user._id} serviceMan={serviceMan} />
  ));

  const activeServices = servicesData?.services.filter(
    (service) => service.active
  );

  return (
    <PageWrapper>
      <Header />
      <MainContentWrapper>
        <ServiceSearchBar />
        <section className="grid grid-col lg:grid-cols-4 w-full gap-5 items-start mb-10">
          <div className="flex col-span-full lg:col-span-1 flex-col gap-2">
            <Badge text="Services" number={activeServices?.length} />
            <ServiceCategoryList
              services={activeServices}
              serviceClickHandler={handleServiceClick}
              selectedServiceName={selectedServiceName}
              setSelectedServiceName={setSelectedServiceName}
            />
          </div>

          <div className="col-span-full lg:col-span-3 w-full justify-center">
            <Badge
              text={`${selectedServiceName} Service Men`}
              number={filteredServiceMen?.length}
            />
            <div className="flex flex-col gap-4 mt-5 pr-6">
              {filteredServiceMen?.length > 0 ? (
                serviceMenList
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
