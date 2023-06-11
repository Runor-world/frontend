import React from "react";
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

  if (isLoading && isFetching && !data) {
    return <Loading />;
  }

  if (isError) {
    return <h1>{error}</h1>;
  }

  const activeServiceMen = data?.serviceMen.filter(({ user }) => user.active);

  const serviceMenList = activeServiceMen.map((serviceMan) => (
    <ServiceMan key={serviceMan._id} serviceMan={serviceMan} />
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
            <ServiceCategoryList services={activeServices} />
          </div>

          <div className="col-span-full lg:col-span-3 w-full justify-center">
            <Badge text="Service Men" number={activeServiceMen.length} />
            <div className="flex flex-col gap-4 mt-5 pr-6">
              {activeServiceMen.length > 0 ? (
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