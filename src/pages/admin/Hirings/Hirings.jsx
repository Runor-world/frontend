import React, { useState } from "react";
import Loading from "../../../components/Loading/Loading";
import { useGetAllHiringsQuery } from "../../../features/api/hiringApi";
import Error from "../../../components/Error/Error";
import Badge from "../../../components/Badge/Badge";
import ScrollableItemsWrapper from "../../../components/ScrollableItemsWrapper/ScrollableItemsWrapper";
import CardButton from "../../../components/CardButton/CardButton";
import { hiringStatus } from "../../../data";
import { AdminHiringItem } from "../../../components/AdminHiringItem/AdminHiringItem";

const Hirings = () => {
  const [filteredHiring, setFilteredHiring] = useState([]);
  const { data, isFetching, isLoading, error, isError } =
    useGetAllHiringsQuery();

  if (isLoading && isFetching && data === undefined) {
    return <Loading />;
  }

  if (isError) return <Error error={error} />;

  return (
    <section className="flex flex-col gap-5 lg:gap-10 lg:flex-row">
      <div className="flex col-span-full lg:col-span-1 flex-col gap-2">
        <h2 className="text-primary font-normal">Filter by status</h2>
        <ScrollableItemsWrapper>
          {hiringStatus.map((status, index) => {
            return (
              <CardButton
                extraStyle="bg-slate-100 text-slate-600 border-2 border-primary my-0 underline"
                text={status}
                key={index}
              />
            );
          })}
        </ScrollableItemsWrapper>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-cetner">
          <Badge text="Hirings" number={data?.hirings?.length} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {data?.hirings.map((item, index) => (
            <AdminHiringItem hiring={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hirings;
