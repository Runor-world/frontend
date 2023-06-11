import React, { useEffect } from "react";
import PropTypes from "prop-types";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import Header from "../../components/Header/Header";
import MainContentWrapper from "../../components/MainContentWrapper/MainContentWrapper";
import Loading from "../../components/Loading/Loading";
import HiringItem from "../../components/HiringItem/HiringItem";
import CardButton from "../../components/CardButton/CardButton";
import ScrollableItemsWrapper from "../../components/ScrollableItemsWrapper/ScrollableItemsWrapper";
import { Link } from "react-router-dom";
import Badge from "../../components/Badge/Badge";
import { useGetAllHiringByUserQuery } from "../../features/api/hiringApi";

const status = ["pending", "in progress", "completed", "cancelled"];

const UserHirings = (props) => {
  const { data, isLoading, isFetching, error, isError } =
    useGetAllHiringByUserQuery();

  if (isLoading && isFetching) {
    return <Loading />;
  }
  if (isError)
    return (
      <div className="flex justify-center items-center text-center">
        <p>{error}</p>
      </div>
    );
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
                  {status.map((item) => {
                    return (
                      <CardButton
                        extraStyle="bg-slate-100 text-slate-600 border-2 border-primary my-0 underline"
                        text={item}
                        key={item}
                      />
                    );
                  })}
                </ScrollableItemsWrapper>
              </div>
              <div className="col-span-full lg:col-span-3 w-full justify-center">
                <Badge
                  text="People/businesses you are hiring"
                  number={data?.hirings?.length}
                />
                <div className="flex flex-col gap-4 mt-5 pr-6">
                  {data?.hirings?.map((hiring) => (
                    <HiringItem key={hiring._id} hiring={hiring} />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="col-span-full flex flex-col place-content-center items-center">
              <h3>You not hired anyone yet</h3>
              <Link className="btn-dark text-white" to={"/"}>
                hire now
              </Link>
            </div>
          )}
        </section>
      </MainContentWrapper>
    </PageWrapper>
  );
};

UserHirings.propTypes = {};

export default UserHirings;
