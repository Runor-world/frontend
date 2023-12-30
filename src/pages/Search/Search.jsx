import { useEffect } from "react";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import MainContentWrapper from "../../components/MainContentWrapper/MainContentWrapper";
import Header from "../../components/Header/Header";
import { useGetServiceMenQuery } from "../../features/api/servicemanApi";
import Loading from "../../components/Loading/Loading";
import Fetching from "../../components/Fetching/Fetching";
import { useSelector } from "react-redux";
import { ITEM_PER__PAGE } from "../../utils/general";
import Footer from "../../components/Footer/Footer";
import ServiceMan from "../../components/ServiceMan/ServiceMan";
import { useNavigate } from "react-router-dom";
import Badge from "../../components/Badge/Badge";

export const Search = () => {
  const { search } = useSelector((store) => store.search);
  const navigate = useNavigate();
  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetServiceMenQuery({
      key: search.key,
      items_per_page: ITEM_PER__PAGE,
      page: 1,
    });

  useEffect(() => {
    if (search.key === "") {
      navigate("/");
    }
    refetch();
  }, [search.key]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError)
    return (
      <div className="flex justify-center items-center text-center">
        <p>{error.message}</p>
      </div>
    );

  return (
    <PageWrapper>
      <Header />
      <MainContentWrapper>
        <div className="col-span-full lg:col-span-3 w-full justify-center">
          <div className="flex flex-col items-center gap-4 mt-5 pr-1 w-full">
            {isFetching ? (
              <Fetching />
            ) : data.serviceMen.length > 0 ? (
              <>
                <div className="flex gap-2 items-center">
                  <Badge number={data.serviceMen.length} />{" "}
                  <p>
                    {data.serviceMen.length > 1 ? "Results" : "Result"} matching{" "}
                    <q>{search.key}</q>
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 w-full">
                  {data.serviceMen.map((serviceMan, index) => (
                    <ServiceMan
                      key={serviceMan?._id + index}
                      serviceMan={serviceMan}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="flex justify-center items-center">
                <p className="text-black">
                  No result matching <q>{search.key}</q>
                </p>
              </div>
            )}
          </div>
        </div>
      </MainContentWrapper>
      <Footer />
    </PageWrapper>
  );
};
