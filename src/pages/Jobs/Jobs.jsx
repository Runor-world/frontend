import React, { useEffect } from "react";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import Header from "../../components/Header/Header";
import MainContentWrapper from "../../components/MainContentWrapper/MainContentWrapper";
import Loading from "../../components/Loading/Loading";
import HiringItem from "../../components/HiringItem/HiringItem";
import CardButton from "../../components/CardButton/CardButton";
import ScrollableItemsWrapper from "../../components/ScrollableItemsWrapper/ScrollableItemsWrapper";
import { Link } from "react-router-dom";
import Badge from "../../components/Badge/Badge";
import {
  useGetAllHiringByUserQuery,
  useGetAllServiceManJobsQuery,
} from "../../features/api/hiringApi";
import { autoTimer } from "../../utils/timer";

const Jobs = (props) => {
  const status = ["pending", "in progress", "completed", "cancelled"];
  const { data, isLoading, isFetching, error, isError } =
    useGetAllHiringByUserQuery();

  // const isLoading = false;
  // const isFetching = false;
  // const isError = false;
  // const error = "error";
  let timer = null;

  useEffect(() => {
    timer = setTimeout(() => {
      console.log("data: ", data);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isError)
    return (
      <div className="flex  flex-col justify-center h-screen items-center text-center">
        <p>Something went wrong</p>
        <Link className="btn-dark" to={"/"}>
          Go Home
        </Link>
      </div>
    );

  if (isLoading && isFetching) {
    return <Loading />;
  }
  return (
    <PageWrapper>
      <Header />
      <MainContentWrapper>
        <section className="grid grid-col lg:grid-cols-4 w-full gap-5 items-start mb-10">
          {data?.hirings.length > 0 ? (
            <>
              <div className="flex col-span-full lg:col-span-1 flex-col gap-5">
                <h2 className="">Filter by status</h2>
                <ScrollableItemsWrapper>
                  {status.map((item, index) => {
                    return (
                      <CardButton
                        extraStyle="bg-slate-100 text-slate-600 border-2 border-primary my-0 underline"
                        text={item}
                        key={index}
                      />
                    );
                  })}
                </ScrollableItemsWrapper>
              </div>
              <div className="col-span-full lg:col-span-3 w-full justify-center">
                <Badge text="Jobs for you" number={data?.hirings.length} />
                <div className="flex flex-col gap-4 mt-5 pr-6">
                  {data?.hirings?.map((job) => (
                    <HiringItem key={job._id} hiring={job} />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="col-span-full flex flex-col place-content-center items-center">
              <h3>You have not been hired yet</h3>
              <Link className="btn-dark text-white" to={"/home"}>
                Go home
              </Link>
            </div>
          )}
        </section>
      </MainContentWrapper>
    </PageWrapper>
  );
};

Jobs.propTypes = {};

export default Jobs;
