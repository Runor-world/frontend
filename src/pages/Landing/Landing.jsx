import React, { useEffect, useState } from "react";
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
  const [categoryText, setCategoryText] = useState("");
  const { data, isLoading, isError, error, isFetching, refetch } =
    useGetServiceMenQuery({
      key: categoryText,
      items_per_page: ITEM_PER__PAGE,
      page: 1,
    });
  const { user } = useSelector((store) => store.auth);

  const { data: servicesData } = useGetServicesQuery();

  const [selectedServiceName, setSelectedServiceName] =
    useState("All Services");

  const handleServiceClick = (serviceName) => {
    // load services based on the clicked service category
    setSelectedServiceName(serviceName);
    if (serviceName === "All Services") {
      // fetch all services
      setCategoryText("");
    } else {
      setCategoryText(serviceName);
    }
  };

  useEffect(() => {
    refetch();
  }, [categoryText, selectedServiceName]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError)
    return (
      <div className="flex justify-center items-center text-center">
        <p>{error.message}</p>
      </div>
    );

  const serviceMenList = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 w-full">
      {data?.serviceMen.map((serviceMan, index) => (
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
        <div className="bg-primary rounded-md p-4 w-fit mx-auto md:mx-0 shadow-lg bg-opacity-70">
          <h3 className="capitalize text-white font-normal md:font-medium text-center md:text-left">
            Hi {user.firstName}! Which service do you need today?
          </h3>
        </div>
        <section className="grid grid-col lg:grid-cols-8 w-full gap-5 items-start mb-10 ">
          <div className="flex col-span-full lg:col-span-2 flex-col gap-2">
            <Badge text="Services" number={activeServices?.length} />
            <ServiceCategoryList
              services={activeServices}
              serviceClickHandler={handleServiceClick}
              selectedServiceName={selectedServiceName}
              setSelectedServiceName={setSelectedServiceName}
            />
          </div>

          <div className="col-span-full lg:col-span-6 w-full justify-center">
            <Badge
              text={`${selectedServiceName} Service Men`}
              number={data?.serviceMen.length}
            />
            {isFetching ? (
              <Fetching message={`Fetching ${selectedServiceName}`} />
            ) : (
              <div className="flex flex-col justify-center gap-4 mt-5 pr-4">
                {data?.serviceMen.length > 0 ? (
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
            )}
          </div>
        </section>
      </MainContentWrapper>
      <Footer />
    </PageWrapper>
  );
}

export default Landing;
