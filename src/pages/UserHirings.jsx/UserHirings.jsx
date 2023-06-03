import React, { useEffect } from "react";
import PropTypes from "prop-types";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import Header from "../../components/Header/Header";
import MainContentWrapper from "../../components/MainContentWrapper/MainContentWrapper";
import { useDispatch, useSelector } from "react-redux";
import { getAllHiringsByUser } from "../../features/hiring/hiringSlice";
import Loading from "../../components/Loading/Loading";
import HiringItem from "../../components/HiringItem/HiringItem";
import CardButton from "../../components/CardButton/CardButton";
import ScrollableItemsWrapper from "../../components/ScrollableItemsWrapper/ScrollableItemsWrapper";
import { Link } from "react-router-dom";
import Badge from "../../components/Badge/Badge";

const status = ["pending", "in progress", "completed", "cancelled"];

const UserHirings = (props) => {
  const { hirings, isLoading } = useSelector((store) => store.hiring);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllHiringsByUser());
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <PageWrapper>
      <Header />
      <MainContentWrapper>
        <section className="grid grid-col lg:grid-cols-4 w-full gap-5 items-start mb-10">
          {hirings.length > 0 ? (
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
                <Badge text="Hiring" number={hirings.length} />
                <div className="flex flex-col gap-4 mt-5 pr-6">
                  {hirings.map((hiring) => (
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
